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

// Loco-only lengths (scene units, pre-scale) + scale factor + car gap
const LOCO_SPECS = [
  { len: 0.92, scale: 1.4, gap: 0.07 }, // Steam: loco + tender
  { len: 0.72, scale: 1.4, gap: 0.06 }, // Diesel
  { len: 0.64, scale: 1.4, gap: 0.05 }, // Electric
  { len: 0.74, scale: 1.5, gap: 0.05 }, // Modern
  { len: 0.94, scale: 1.5, gap: 0.04 }, // Bullet
]

interface CarSpec {
  len: number
  w: number
  h: number
  color: string
  stripe?: string
}

// Trailing cars per track — positioned independently along the curve
const TRAILING_CONFIGS: CarSpec[][] = [
  // Track 1: Steam — 5 wooden freight cars
  [
    { len: 0.42, w: 0.27, h: 0.20, color: '#7a5228' },
    { len: 0.42, w: 0.27, h: 0.20, color: '#6a4218' },
    { len: 0.42, w: 0.27, h: 0.20, color: '#7a5228' },
    { len: 0.42, w: 0.27, h: 0.20, color: '#5a3810' },
    { len: 0.42, w: 0.27, h: 0.20, color: '#7a5228' },
  ],
  // Track 2: Diesel — 6 freight/tanker cars
  [
    { len: 0.44, w: 0.27, h: 0.22, color: '#3a3a28', stripe: '#c8a020' },
    { len: 0.44, w: 0.27, h: 0.22, color: '#2a2a1e' },
    { len: 0.44, w: 0.27, h: 0.22, color: '#3a3a28', stripe: '#c8a020' },
    { len: 0.44, w: 0.27, h: 0.22, color: '#2a2a1e' },
    { len: 0.44, w: 0.27, h: 0.22, color: '#3a3a28' },
    { len: 0.44, w: 0.27, h: 0.22, color: '#2a2a1e', stripe: '#c8a020' },
  ],
  // Track 3: Electric — 7 navy passenger cars
  Array.from({ length: 7 }, () => ({
    len: 0.44, w: 0.26, h: 0.23, color: '#1a2a5a', stripe: '#b0b8c0',
  })),
  // Track 4: Modern — 8 white/blue passenger cars
  Array.from({ length: 8 }, () => ({
    len: 0.46, w: 0.26, h: 0.24, color: '#f0f0ee', stripe: '#1e50a0',
  })),
  // Track 5: Bullet — 10 Shinkansen cars
  Array.from({ length: 10 }, () => ({
    len: 0.42, w: 0.24, h: 0.22, color: '#f6f8fa', stripe: '#0066b2',
  })),
]

function buildSemicircle(radius: number): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = []
  const seg = 128
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI
    pts.push(new THREE.Vector3(radius * Math.cos(a), 0, -radius * Math.sin(a)))
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1)
}

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
  const ensembleRef = useRef<THREE.Group>(null)
  const progressRef = useRef(trackIndex * 0.18)
  const speedObj = useRef({ value: 1.0 })
  const opacityObj = useRef({ value: 1.0 })
  const isBullet = trackIndex === 4

  const curve = useMemo(() => buildSemicircle(radius), [radius])
  const leftRail = useMemo(() => buildRailCurve(radius, -0.1), [radius])
  const rightRail = useMemo(() => buildRailCurve(radius, 0.1), [radius])

  const TrainComp = TRAIN_COMPONENTS[trackIndex]
  const locoSpec = LOCO_SPECS[trackIndex]
  const trailingCars = TRAILING_CONFIGS[trackIndex]

  const sleeperGeom = useMemo(
    () => new THREE.BoxGeometry(trackIndex < 2 ? 0.55 : 0.48, 0.055, trackIndex < 2 ? 0.14 : 0.1),
    [trackIndex]
  )
  const railGeom = useMemo(() => new THREE.TubeGeometry(leftRail, 256, 0.018, 5, false), [leftRail])
  const railGeomR = useMemo(() => new THREE.TubeGeometry(rightRail, 256, 0.018, 5, false), [rightRail])

  const sleeperColor = ['#5a3a1a', '#4a3a2a', '#7a7878', '#828282', '#909090'][trackIndex]
  const railColor = ['#6a5040', '#707070', '#909090', '#a0a0a0', '#c0c8d0'][trackIndex]
  const railRoughness = [0.85, 0.7, 0.55, 0.45, 0.3][trackIndex]
  const railMetal = [0.05, 0.2, 0.45, 0.6, 0.75][trackIndex]

  useEffect(() => {
    const isMe = hoveredTrain?.id === trainData.id
    const anyHovered = hoveredTrain !== null
    const target = anyHovered ? (isMe ? 0.12 : 0.38) : 1.0
    gsap.killTweensOf(speedObj.current)
    gsap.to(speedObj.current, { value: target, duration: 0.9, ease: 'power2.inOut' })
  }, [hoveredTrain, trainData.id])

  const _pt = useMemo(() => new THREE.Vector3(), [])
  const _tg = useMemo(() => new THREE.Vector3(), [])

  // Arc circumference of the semicircle
  const arcLen = radius * Math.PI

  useFrame((_, delta) => {
    if (!ensembleRef.current) return

    progressRef.current += speed * delta * speedObj.current.value
    if (progressRef.current >= 1) progressRef.current -= 1

    const children = ensembleRef.current.children

    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      let worldBehind: number
      if (i === 0) {
        // Locomotive at lead position
        worldBehind = 0
      } else {
        // Trailing car at index i (cars array index = i-1)
        const carIndex = i - 1
        const carSpec = trailingCars[carIndex]
        // Distance from loco center to this car's center
        const locoHalfLen = (locoSpec.len * locoSpec.scale) / 2
        worldBehind = locoHalfLen + locoSpec.gap
        for (let j = 0; j < carIndex; j++) {
          worldBehind += trailingCars[j].len + locoSpec.gap
        }
        worldBehind += carSpec.len / 2
      }

      const tOffset = worldBehind / arcLen
      const tRaw = progressRef.current - tOffset

      // Hide cars that haven't entered the track arc yet
      if (tRaw < 0) {
        child.visible = false
        continue
      }

      child.visible = true
      const tCar = tRaw % 1

      curve.getPointAt(tCar, _pt)
      curve.getTangentAt(tCar, _tg)

      child.position.set(_pt.x, _pt.y + 0.16, _pt.z)
      child.rotation.set(0, Math.atan2(_tg.x, _tg.z), 0)
    }

    // Bullet train tunnel fade
    if (isBullet) {
      const t = progressRef.current
      const inTunnel = t > 0.86 || t < 0.09
      const targetOpacity = inTunnel ? 0.0 : 1.0
      opacityObj.current.value += (targetOpacity - opacityObj.current.value) * 0.12
      const op = opacityObj.current.value
      ensembleRef.current.traverse((child) => {
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
      {/* Track infrastructure */}
      <SleeperInstances matrices={sleeperMatrices} geom={sleeperGeom} color={sleeperColor} />
      <mesh geometry={railGeom}>
        <meshStandardMaterial color={railColor} metalness={railMetal} roughness={railRoughness} />
      </mesh>
      <mesh geometry={railGeomR}>
        <meshStandardMaterial color={railColor} metalness={railMetal} roughness={railRoughness} />
      </mesh>

      {/* Train ensemble — each car group is positioned independently in useFrame */}
      <group
        ref={ensembleRef}
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
        {/* Locomotive (index 0) */}
        <group scale={locoSpec.scale}>
          <TrainComp isHovered={isHovered} />
        </group>
        {/* Trailing cars (indices 1..N) */}
        {trailingCars.map((car, i) => (
          <group key={i}>
            <CarBody spec={car} />
          </group>
        ))}
      </group>
    </group>
  )
}

function CarBody({ spec }: { spec: CarSpec }) {
  const centerY = 0.13
  return (
    <>
      {/* Car body */}
      <mesh position={[0, centerY, 0]}>
        <boxGeometry args={[spec.w, spec.h, spec.len]} />
        <meshStandardMaterial color={spec.color} roughness={0.75} metalness={0.15} />
      </mesh>
      {/* Colour stripe */}
      {spec.stripe && (
        <mesh position={[0, centerY - spec.h * 0.22, 0]}>
          <boxGeometry args={[spec.w + 0.002, spec.h * 0.22, spec.len + 0.002]} />
          <meshStandardMaterial color={spec.stripe} roughness={0.65} metalness={0.25} />
        </mesh>
      )}
      {/* Window strip — right side */}
      <mesh position={[spec.w / 2 + 0.001, centerY + spec.h * 0.18, 0]}>
        <boxGeometry args={[0.004, spec.h * 0.3, spec.len * 0.74]} />
        <meshStandardMaterial color="#c8e4f0" roughness={0.1} metalness={0.45} transparent opacity={0.82} />
      </mesh>
      {/* Undercarriage */}
      <mesh position={[0, centerY - spec.h * 0.5 - 0.015, 0]}>
        <boxGeometry args={[spec.w + 0.02, 0.028, spec.len - 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.85} metalness={0.3} />
      </mesh>
    </>
  )
}

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
