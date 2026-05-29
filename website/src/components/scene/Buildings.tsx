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

    // === RIGHT SECTOR: Modern glass towers (angles 0.03–0.40) ===
    const rightAngles = [0.03, 0.06, 0.10, 0.14, 0.18, 0.22, 0.26, 0.30, 0.34, 0.37, 0.40]
    rightAngles.forEach((a, ai) => {
      const angle = a * Math.PI
      const r1 = outerRadius + 0.45 + rng(idx++) * 0.55
      buildings.push({
        x: r1 * Math.cos(angle),
        z: -r1 * Math.sin(angle),
        w: 0.32 + rng(idx++) * 0.42,
        d: 0.32 + rng(idx++) * 0.42,
        h: 1.5 + rng(idx++) * 4.5,
        color: getModernColor(rng(idx++)),
        windows: true,
      })
      const r2 = outerRadius + 1.1 + rng(idx++) * 0.9
      buildings.push({
        x: r2 * Math.cos(angle + 0.018),
        z: -r2 * Math.sin(angle + 0.018),
        w: 0.28 + rng(idx++) * 0.46,
        d: 0.28 + rng(idx++) * 0.46,
        h: 1.0 + rng(idx++) * 3.8,
        color: getModernColor(rng(idx++)),
        windows: ai > 2,
      })
      if (ai % 3 === 0) {
        const r3 = outerRadius + 1.8 + rng(idx++) * 0.7
        buildings.push({
          x: r3 * Math.cos(angle + 0.03),
          z: -r3 * Math.sin(angle + 0.03),
          w: 0.38 + rng(idx++) * 0.5,
          d: 0.38 + rng(idx++) * 0.5,
          h: 2.0 + rng(idx++) * 5.0,
          color: getModernColor(rng(idx++)),
          windows: true,
        })
      }
    })

    // === TOP CENTER SECTOR: Mixed modern/mid-rise (angles 0.41–0.75) ===
    const topAngles = [0.42, 0.46, 0.50, 0.54, 0.58, 0.62, 0.66, 0.70, 0.74]
    topAngles.forEach((a, ai) => {
      const angle = a * Math.PI
      const r1 = outerRadius + 0.42 + rng(idx++) * 0.65
      buildings.push({
        x: r1 * Math.cos(angle),
        z: -r1 * Math.sin(angle),
        w: 0.3 + rng(idx++) * 0.46,
        d: 0.3 + rng(idx++) * 0.46,
        h: 0.6 + rng(idx++) * 2.8,
        color: ai < 4 ? getModernColor(rng(idx++)) : getMidColor(rng(idx++)),
        windows: ai < 5,
      })
      const r2 = outerRadius + 1.0 + rng(idx++) * 0.7
      buildings.push({
        x: r2 * Math.cos(angle + 0.016),
        z: -r2 * Math.sin(angle + 0.016),
        w: 0.26 + rng(idx++) * 0.38,
        d: 0.26 + rng(idx++) * 0.38,
        h: 0.4 + rng(idx++) * 2.2,
        color: getMidColor(rng(idx++)),
        windows: ai < 3,
      })
    })

    // === LEFT SECTOR: Older residential/commercial (angles 0.76–0.97) ===
    const leftAngles = [0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95]
    leftAngles.forEach((a) => {
      const angle = a * Math.PI
      const r1 = outerRadius + 0.40 + rng(idx++) * 0.60
      buildings.push({
        x: r1 * Math.cos(angle),
        z: -r1 * Math.sin(angle),
        w: 0.32 + rng(idx++) * 0.44,
        d: 0.32 + rng(idx++) * 0.44,
        h: 0.5 + rng(idx++) * 1.8,
        color: getOldColor(rng(idx++)),
        windows: false,
      })
      const r2 = outerRadius + 1.0 + rng(idx++) * 0.65
      buildings.push({
        x: r2 * Math.cos(angle + 0.02),
        z: -r2 * Math.sin(angle + 0.02),
        w: 0.28 + rng(idx++) * 0.36,
        d: 0.28 + rng(idx++) * 0.36,
        h: 0.4 + rng(idx++) * 1.4,
        color: getOldColor(rng(idx++)),
        windows: false,
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

function getModernColor(t: number): string {
  const palette = ['#c8d4e2', '#d4dcea', '#bccad8', '#dce4f0', '#e4ecf8', '#ccd8e8', '#b8c8da']
  return palette[Math.floor(t * palette.length)]
}

function getMidColor(t: number): string {
  const palette = ['#c8c4b8', '#d0ccc0', '#b8c0c0', '#c4c8c0', '#d0c8b8', '#c0bcb0', '#bcc0b8']
  return palette[Math.floor(t * palette.length)]
}

function getOldColor(t: number): string {
  const palette = ['#b8a898', '#c4b0a0', '#a89888', '#bcac9c', '#c8b8a8', '#b0a090', '#c0a898']
  return palette[Math.floor(t * palette.length)]
}

function Building({ spec }: { spec: BuildingSpec }) {
  return (
    <group position={[spec.x, 0, spec.z]}>
      {/* Main tower */}
      <mesh castShadow receiveShadow position={[0, spec.h / 2, 0]}>
        <boxGeometry args={[spec.w, spec.h, spec.d]} />
        <meshStandardMaterial color={spec.color} roughness={0.42} metalness={0.42} />
      </mesh>
      {/* Reflective glass face */}
      {spec.windows && (
        <mesh castShadow position={[0, spec.h * 0.5, spec.d / 2 + 0.001]}>
          <boxGeometry args={[spec.w * 0.88, spec.h * 0.82, 0.01]} />
          <meshStandardMaterial color="#cce6ff" roughness={0.04} metalness={0.85} transparent opacity={0.6} />
        </mesh>
      )}
      {/* Roof detail */}
      <mesh castShadow position={[0, spec.h + 0.04, 0]}>
        <boxGeometry args={[spec.w * 0.55, 0.07, spec.d * 0.55]} />
        <meshStandardMaterial color="#8a9cae" roughness={0.38} metalness={0.65} />
      </mesh>
      {/* Antenna on tall buildings */}
      {spec.h > 2.5 && (
        <mesh castShadow position={[0, spec.h + 0.25, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
          <meshStandardMaterial color="#707880" roughness={0.38} metalness={0.75} />
        </mesh>
      )}
    </group>
  )
}
