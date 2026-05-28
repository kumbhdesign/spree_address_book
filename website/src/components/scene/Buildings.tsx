'use client'

import { useMemo } from 'react'

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
  windows: boolean
}

function rng(n: number) {
  let s = n * 1664525 + 1013904223
  return ((s & 0x7fffffff) / 0x7fffffff)
}

export default function Buildings({ outerRadius }: Props) {
  const specs = useMemo<BuildingSpec[]>(() => {
    const buildings: BuildingSpec[] = []
    let idx = 0

    // Right cluster — modern city / Shinkansen exit zone (angles 0.02–0.38)
    const rightAngles = [0.03, 0.07, 0.11, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35, 0.38]
    rightAngles.forEach((a, ai) => {
      // Front row
      const r1 = outerRadius + 0.5 + rng(idx++) * 0.6
      const angle = a * Math.PI
      buildings.push({
        x: r1 * Math.cos(angle),
        z: -r1 * Math.sin(angle),
        w: 0.35 + rng(idx++) * 0.45,
        d: 0.35 + rng(idx++) * 0.45,
        h: 1.2 + rng(idx++) * 3.8,
        color: getModernColor(rng(idx++)),
        windows: true,
      })
      // Back row (deeper)
      const r2 = outerRadius + 1.2 + rng(idx++) * 0.8
      buildings.push({
        x: r2 * Math.cos(angle + 0.02),
        z: -r2 * Math.sin(angle + 0.02),
        w: 0.3 + rng(idx++) * 0.5,
        d: 0.3 + rng(idx++) * 0.5,
        h: 0.8 + rng(idx++) * 2.5,
        color: getModernColor(rng(idx++)),
        windows: ai > 3,
      })
    })

    // Top-left city arc (angles 0.40–0.94) — mixed new city
    const topAngles = [0.41, 0.46, 0.50, 0.55, 0.59, 0.64, 0.68, 0.73, 0.77, 0.82, 0.86, 0.90, 0.93]
    topAngles.forEach((a, ai) => {
      const r1 = outerRadius + 0.45 + rng(idx++) * 0.7
      const angle = a * Math.PI
      buildings.push({
        x: r1 * Math.cos(angle),
        z: -r1 * Math.sin(angle),
        w: 0.3 + rng(idx++) * 0.5,
        d: 0.3 + rng(idx++) * 0.5,
        h: 0.5 + rng(idx++) * 2.2,
        color: getMidColor(rng(idx++)),
        windows: false,
      })
      if (ai % 2 === 0) {
        const r2 = outerRadius + 1.1 + rng(idx++) * 0.6
        buildings.push({
          x: r2 * Math.cos(angle + 0.015),
          z: -r2 * Math.sin(angle + 0.015),
          w: 0.25 + rng(idx++) * 0.4,
          d: 0.25 + rng(idx++) * 0.4,
          h: 0.4 + rng(idx++) * 1.6,
          color: getMidColor(rng(idx++)),
          windows: false,
        })
      }
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

function getModernColor(t: number): string {
  const palette = ['#c8d4e2', '#d4dcea', '#bccad8', '#dce4f0', '#e4ecf8', '#ccd8e8', '#b8c8da']
  return palette[Math.floor(t * palette.length)]
}

function getMidColor(t: number): string {
  const palette = ['#c8c4b8', '#d0ccc0', '#b8c0c0', '#c4c8c0', '#d0c8b8', '#c0bcb0', '#bcc0b8']
  return palette[Math.floor(t * palette.length)]
}

function Building({ spec }: { spec: BuildingSpec }) {
  return (
    <group position={[spec.x, 0, spec.z]}>
      {/* Main tower */}
      <mesh position={[0, spec.h / 2, 0]}>
        <boxGeometry args={[spec.w, spec.h, spec.d]} />
        <meshStandardMaterial color={spec.color} roughness={0.45} metalness={0.45} />
      </mesh>
      {/* Reflective glass face */}
      {spec.windows && (
        <mesh position={[0, spec.h * 0.5, spec.d / 2 + 0.001]}>
          <boxGeometry args={[spec.w * 0.88, spec.h * 0.82, 0.01]} />
          <meshStandardMaterial color="#d8eeff" roughness={0.05} metalness={0.8} transparent opacity={0.55} />
        </mesh>
      )}
      {/* Roof detail */}
      <mesh position={[0, spec.h + 0.04, 0]}>
        <boxGeometry args={[spec.w * 0.55, 0.07, spec.d * 0.55]} />
        <meshStandardMaterial color="#9aacbe" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Antenna on tall buildings */}
      {spec.h > 2.5 && (
        <mesh position={[0, spec.h + 0.25, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
          <meshStandardMaterial color="#808898" roughness={0.4} metalness={0.7} />
        </mesh>
      )}
    </group>
  )
}
