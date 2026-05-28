'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import SteamTrain from './trains/SteamTrain'
import DieselTrain from './trains/DieselTrain'
import ElectricTrain from './trains/ElectricTrain'
import ModernTrain from './trains/ModernTrain'
import BulletTrain from './trains/BulletTrain'
import type { TrainData } from '@/config/siteConfig'
import type { HoveredTrain } from '../HeroSection'

const TRAIN_COMPONENTS = [SteamTrain, DieselTrain, ElectricTrain, ModernTrain, BulletTrain]

// Build a CatmullRom semicircle in the XZ plane, arcing toward -Z
function buildSemicircle(radius: number): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = []
  const seg = 128
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI
    pts.push(new THREE.Vector3(radius * Math.cos(a), 0, -radius * Math.sin(a)))
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1)
}

// Rail tube offset from centre line
function buildRailCurve(radius: number, offset: number): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = []
  const seg = 128
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI
    pts.push(new THREE.Vector3((radius + offset) * Math.cos(a), 0.05, -(radius + offset) * Math.sin(a)))
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1)
}

interface Props {
  trainData: TrainData
  radius: number
  speed: number
  trackIndex: number
  hoveredTrain: HoveredTrain
  setHoveredTrain: (t: HoveredTrain) => void
}

export default function TrackWithTrain({
  trainData,
  radius,
  speed,
  trackIndex,
  hoveredTrain,
  setHoveredTrain,
}: Props) {
  const trainRef = useRef<THREE.Group>(null)
  const progressRef = useRef(trackIndex * 0.18) // stagger start positions
  const speedObj = useRef({ value: 1.0 })
  const opacityObj = useRef({ value: 1.0 })
  const isBullet = trackIndex === 4

  const curve = useMemo(() => buildSemicircle(radius), [radius])
  const leftRail = useMemo(() => buildRailCurve(radius, -0.1), [radius])
  const rightRail = useMemo(() => buildRailCurve(radius, 0.1), [radius])

  const TrainComp = TRAIN_COMPONENTS[trackIndex]

  // Geometry memos
  const sleeperGeom = useMemo(
    () => new THREE.BoxGeometry(trackIndex < 2 ? 0.55 : 0.48, 0.055, trackIndex < 2 ? 0.14 : 0.1),
    [trackIndex]
  )
  const railGeom = useMemo(() => new THREE.TubeGeometry(leftRail, 256, 0.018, 5, false), [leftRail])
  const railGeomR = useMemo(() => new THREE.TubeGeometry(rightRail, 256, 0.018, 5, false), [rightRail])

  // Era-based colours
  const sleeperColor = ['#5a3a1a', '#4a3a2a', '#7a7878', '#828282', '#909090'][trackIndex]
  const railColor = ['#6a5040', '#707070', '#909090', '#a0a0a0', '#c0c8d0'][trackIndex]
  const railRoughness = [0.85, 0.7, 0.55, 0.45, 0.3][trackIndex]
  const railMetal = [0.05, 0.2, 0.45, 0.6, 0.75][trackIndex]

  // GSAP speed tween on hover state change
  useEffect(() => {
    const isMe = hoveredTrain?.id === trainData.id
    const anyHovered = hoveredTrain !== null
    const target = anyHovered ? (isMe ? 0.12 : 0.38) : 1.0
    gsap.killTweensOf(speedObj.current)
    gsap.to(speedObj.current, { value: target, duration: 0.9, ease: 'power2.inOut' })
  }, [hoveredTrain, trainData.id])

  // Reusable temp objects (avoid GC pressure in useFrame)
  const _pt = useMemo(() => new THREE.Vector3(), [])
  const _tg = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (!trainRef.current) return

    progressRef.current += speed * delta * speedObj.current.value
    if (progressRef.current >= 1) progressRef.current -= 1

    const t = progressRef.current
    curve.getPointAt(t, _pt)
    curve.getTangentAt(t, _tg)

    // Position slightly above track surface
    trainRef.current.position.set(_pt.x, _pt.y + 0.16, _pt.z)
    // Align to travel direction: mesh nose = +Z local
    trainRef.current.rotation.y = Math.atan2(_tg.x, _tg.z)

    // Track 5 tunnel fade — left end (t>0.86) and right emergence (t<0.09)
    if (isBullet) {
      const inTunnel = t > 0.86 || t < 0.09
      const targetOpacity = inTunnel ? 0.0 : 1.0
      opacityObj.current.value += (targetOpacity - opacityObj.current.value) * 0.12
      const op = opacityObj.current.value
      trainRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.transparent = true
            mat.opacity = op
          }
        }
      })
    }
  })

  // Instanced sleepers
  const sleeperCount = Math.round(radius * 22)
  const sleeperMatrices = useMemo(() => {
    const dummy = new THREE.Object3D()
    const mats: THREE.Matrix4[] = []
    const tg = new THREE.Vector3()
    for (let i = 0; i < sleeperCount; i++) {
      const t = i / sleeperCount
      const pt = curve.getPointAt(t)
      curve.getTangentAt(t, tg)
      dummy.position.set(pt.x, pt.y + 0.03, pt.z)
      dummy.rotation.y = Math.atan2(tg.x, tg.z)
      dummy.updateMatrix()
      mats.push(dummy.matrix.clone())
    }
    return mats
  }, [curve, sleeperCount])

  const [isHovered, setIsHovered] = useState(false)

  return (
    <group>
      {/* Sleepers via instanced mesh */}
      <SleeperInstances matrices={sleeperMatrices} geom={sleeperGeom} color={sleeperColor} />

      {/* Left rail */}
      <mesh geometry={railGeom}>
        <meshStandardMaterial color={railColor} metalness={railMetal} roughness={railRoughness} />
      </mesh>
      {/* Right rail */}
      <mesh geometry={railGeomR}>
        <meshStandardMaterial color={railColor} metalness={railMetal} roughness={railRoughness} />
      </mesh>

      {/* Train */}
      <group
        ref={trainRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredTrain(trainData)
          setIsHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHoveredTrain(null)
          setIsHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <TrainComp isHovered={isHovered} />
      </group>
    </group>
  )
}

// Instanced mesh helper — sets matrices once on mount
function SleeperInstances({
  matrices,
  geom,
  color,
}: {
  matrices: THREE.Matrix4[]
  geom: THREE.BufferGeometry
  color: string
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const m = meshRef.current
    if (!m) return
    matrices.forEach((mat, i) => m.setMatrixAt(i, mat))
    m.instanceMatrix.needsUpdate = true
  }, [matrices])

  return (
    <instancedMesh ref={meshRef} args={[geom, undefined, matrices.length]}>
      <meshStandardMaterial color={color} roughness={0.9} metalness={0} />
    </instancedMesh>
  )
}
