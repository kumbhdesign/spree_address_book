'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

interface Props {
  radii: number[]
}

function rng(n: number) {
  let s = n * 1664525 + 1013904223
  return ((s & 0x7fffffff) / 0x7fffffff)
}

interface TreeData {
  x: number
  z: number
  scale: number
  shade: number
  type: number
}

export default function Trees({ radii }: Props) {
  const trees = useMemo<TreeData[]>(() => {
    const out: TreeData[] = []
    let idx = 0

    const bands = [
      { inner: radii[0] + 0.18, outer: radii[1] - 0.18, count: 34 },  // T1-T2
      { inner: radii[1] + 0.18, outer: 3.85, count: 20 },              // T2 to water
      { inner: 5.0, outer: radii[2] - 0.15, count: 26 },               // water to T3
      { inner: radii[2] + 0.15, outer: radii[3] - 0.15, count: 50 },   // T3-T4 (dense forest)
      { inner: radii[3] + 0.15, outer: 6.45, count: 32 },              // T4 to water
      { inner: 7.5, outer: radii[4] - 0.15, count: 22 },               // water to T5
    ]

    bands.forEach(({ inner, outer, count }) => {
      for (let i = 0; i < count; i++) {
        const r = rng(idx++) * (outer - inner) + inner
        const angle = rng(idx++) * Math.PI
        out.push({
          x: r * Math.cos(angle),
          z: -r * Math.sin(angle),
          scale: 0.15 + rng(idx++) * 0.28,
          shade: rng(idx++),
          type: Math.floor(rng(idx++) * 3),
        })
      }
    })

    // Inner circle (center of diorama)
    for (let i = 0; i < 16; i++) {
      const r = rng(idx++) * (radii[0] - 0.3) + 0.1
      const angle = rng(idx++) * Math.PI
      out.push({
        x: r * Math.cos(angle),
        z: -r * Math.sin(angle),
        scale: 0.08 + rng(idx++) * 0.12,
        shade: rng(idx++),
        type: Math.floor(rng(idx++) * 2),
      })
    }

    return out
  }, [radii])

  return (
    <>
      {trees.map((t, i) => (
        <Tree key={i} data={t} />
      ))}
    </>
  )
}

function Tree({ data }: { data: TreeData }) {
  const { x, z, scale, shade, type } = data

  const canopyA = useMemo(
    () => new THREE.Color().setHSL(0.28 + shade * 0.06, 0.58 + shade * 0.18, 0.18 + shade * 0.12),
    [shade]
  )
  const canopyB = useMemo(
    () => new THREE.Color().setHSL(0.30 + shade * 0.04, 0.52 + shade * 0.14, 0.25 + shade * 0.10),
    [shade]
  )
  const r = scale * 0.48

  if (type === 2) {
    // Low bush / shrub
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, scale * 0.18, 0]}>
          <sphereGeometry args={[r * 0.9, 6, 5]} />
          <meshStandardMaterial color={canopyA} roughness={0.9} flatShading />
        </mesh>
        <mesh position={[scale * 0.08, scale * 0.14, scale * 0.06]}>
          <sphereGeometry args={[r * 0.65, 6, 4]} />
          <meshStandardMaterial color={canopyB} roughness={0.9} flatShading />
        </mesh>
      </group>
    )
  }

  if (type === 1) {
    // Taller, narrower tree
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, scale * 0.16, 0]}>
          <cylinderGeometry args={[r * 0.07, r * 0.11, scale * 0.32, 5]} />
          <meshStandardMaterial color="#4a2e10" roughness={1} />
        </mesh>
        <mesh position={[0, scale * 0.58, 0]}>
          <sphereGeometry args={[r * 0.82, 7, 6]} />
          <meshStandardMaterial color={canopyA} roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0, scale * 0.82, 0]}>
          <sphereGeometry args={[r * 0.58, 6, 5]} />
          <meshStandardMaterial color={canopyB} roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0, scale * 1.0, 0]}>
          <sphereGeometry args={[r * 0.32, 5, 4]} />
          <meshStandardMaterial color={canopyA} roughness={0.85} flatShading />
        </mesh>
      </group>
    )
  }

  // Default: round canopy tree — matches the reference image's deciduous style
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, scale * 0.15, 0]}>
        <cylinderGeometry args={[r * 0.07, r * 0.12, scale * 0.3, 5]} />
        <meshStandardMaterial color="#4a2e10" roughness={1} />
      </mesh>
      <mesh position={[0, scale * 0.52, 0]}>
        <sphereGeometry args={[r, 8, 7]} />
        <meshStandardMaterial color={canopyA} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[scale * 0.04, scale * 0.74, scale * 0.02]}>
        <sphereGeometry args={[r * 0.76, 7, 6]} />
        <meshStandardMaterial color={canopyB} roughness={0.85} flatShading />
      </mesh>
    </group>
  )
}
