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
}

export default function Trees({ radii }: Props) {
  const trees = useMemo<TreeData[]>(() => {
    const out: TreeData[] = []
    let idx = 0

    // Much denser bands matching reference image
    const bands = [
      { inner: radii[0] + 0.18, outer: radii[1] - 0.18, count: 30 },  // T1-T2
      { inner: radii[1] + 0.18, outer: 3.85, count: 20 },              // T2 to water edge
      { inner: 5.0, outer: radii[2] - 0.15, count: 22 },               // water to T3
      { inner: radii[2] + 0.15, outer: radii[3] - 0.15, count: 38 },   // T3-T4 (dense forest)
      { inner: radii[3] + 0.15, outer: 6.45, count: 30 },              // T4 to water
      { inner: 7.5, outer: radii[4] - 0.15, count: 20 },               // water to T5
    ]

    bands.forEach(({ inner, outer, count }) => {
      for (let i = 0; i < count; i++) {
        const r = rng(idx++) * (outer - inner) + inner
        const angle = rng(idx++) * Math.PI
        out.push({
          x: r * Math.cos(angle),
          z: -r * Math.sin(angle),
          scale: 0.14 + rng(idx++) * 0.22,
          shade: rng(idx++),
        })
      }
    })

    // Inner circle (center of diorama)
    for (let i = 0; i < 14; i++) {
      const r = rng(idx++) * (radii[0] - 0.3) + 0.1
      const angle = rng(idx++) * Math.PI
      out.push({
        x: r * Math.cos(angle),
        z: -r * Math.sin(angle),
        scale: 0.08 + rng(idx++) * 0.1,
        shade: rng(idx++),
      })
    }

    return out
  }, [radii])

  return (
    <>
      {trees.map((t, i) => (
        <Tree key={i} x={t.x} z={t.z} scale={t.scale} shade={t.shade} />
      ))}
    </>
  )
}

function Tree({ x, z, scale, shade }: TreeData) {
  const green = useMemo(
    () => new THREE.Color().setHSL(0.28 + shade * 0.08, 0.6 + shade * 0.2, 0.18 + shade * 0.14),
    [shade]
  )
  const h = scale
  const r = scale * 0.38

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h * 0.2, 0]}>
        <cylinderGeometry args={[r * 0.12, r * 0.18, h * 0.4, 5]} />
        <meshStandardMaterial color="#4a2e10" roughness={1} />
      </mesh>
      <mesh position={[0, h * 0.68, 0]}>
        <coneGeometry args={[r, h * 0.72, 7]} />
        <meshStandardMaterial color={green} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, h * 0.46, 0]}>
        <coneGeometry args={[r * 1.3, h * 0.42, 7]} />
        <meshStandardMaterial color={green} roughness={0.85} flatShading />
      </mesh>
    </group>
  )
}
