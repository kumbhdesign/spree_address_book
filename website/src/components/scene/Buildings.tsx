'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

// Modern city cluster — positioned on the right outer side of Track 5
// and the top-arc area, representing the urban skyline
interface Props {
  outerRadius: number
}

interface BuildingSpec {
  x: number
  z: number
  w: number
  d: number
  h: number
  color: string
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function pseudoRand(n: number) {
  let s = n * 1664525 + 1013904223
  return ((s & 0x7fffffff) / 0x7fffffff)
}

export default function Buildings({ outerRadius }: Props) {
  const specs = useMemo<BuildingSpec[]>(() => {
    const buildings: BuildingSpec[] = []
    let idx = 0

    // Right cluster — emerges from tunnel, high-rise zone
    const rightAngles = [0.04, 0.09, 0.14, 0.18, 0.22, 0.27, 0.32, 0.36, 0.4]
    rightAngles.forEach((a) => {
      const baseR = outerRadius + 0.6 + pseudoRand(idx++) * 1.2
      const angle = a * Math.PI
      buildings.push({
        x: baseR * Math.cos(angle),
        z: -baseR * Math.sin(angle),
        w: 0.3 + pseudoRand(idx++) * 0.4,
        d: 0.3 + pseudoRand(idx++) * 0.4,
        h: 0.6 + pseudoRand(idx++) * 2.5,
        color: getColor(pseudoRand(idx++), true),
      })
    })

    // Back/top arc cluster — city behind the furthest track
    const topAngles = [0.42, 0.47, 0.52, 0.58, 0.63, 0.68, 0.72, 0.77, 0.82, 0.87, 0.92]
    topAngles.forEach((a) => {
      const baseR = outerRadius + 0.5 + pseudoRand(idx++) * 1.4
      const angle = a * Math.PI
      buildings.push({
        x: baseR * Math.cos(angle),
        z: -baseR * Math.sin(angle),
        w: 0.25 + pseudoRand(idx++) * 0.35,
        d: 0.25 + pseudoRand(idx++) * 0.35,
        h: 0.4 + pseudoRand(idx++) * 2.0,
        color: getColor(pseudoRand(idx++), false),
      })
    })

    return buildings
  }, [outerRadius])

  return (
    <>
      {specs.map((b, i) => (
        <Building key={i} spec={b} />
      ))}
    </>
  )
}

function getColor(t: number, isHighrise: boolean): string {
  if (isHighrise) {
    const hues = ['#c8d4e0', '#d0d8e8', '#b8c8d8', '#d8e0ec', '#e0e8f0']
    return hues[Math.floor(t * hues.length)]
  }
  const hues = ['#c0c8c8', '#c8c8b8', '#b8c0c8', '#d0d0c0', '#c8d0c8']
  return hues[Math.floor(t * hues.length)]
}

function Building({ spec }: { spec: BuildingSpec }) {
  return (
    <group position={[spec.x, 0, spec.z]}>
      {/* Main tower */}
      <mesh position={[0, spec.h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[spec.w, spec.h, spec.d]} />
        <meshStandardMaterial color={spec.color} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Window grid suggestion — lighter band */}
      <mesh position={[0, spec.h * 0.5, 0]}>
        <boxGeometry args={[spec.w * 0.95, spec.h * 0.8, spec.d * 0.01]} />
        <meshStandardMaterial color="#e8f0ff" roughness={0.1} metalness={0.7} transparent opacity={0.3} />
      </mesh>
      {/* Roof accent */}
      <mesh position={[0, spec.h + 0.05, 0]}>
        <boxGeometry args={[spec.w * 0.6, 0.08, spec.d * 0.6]} />
        <meshStandardMaterial color="#a0b0c0" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  )
}
