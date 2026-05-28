'use client'

import { useMemo, useEffect, useRef } from 'react'
import * as THREE from 'three'

// Simple low-poly conifer trees scattered between tracks
interface Props {
  radii: number[]
}

function randomSeed(n: number) {
  // Simple LCG for deterministic pseudo-random values
  let s = n * 1664525 + 1013904223
  return ((s & 0x7fffffff) / 0x7fffffff)
}

interface TreeData {
  x: number
  y: number
  z: number
  scale: number
  shade: number // 0-1
}

export default function Trees({ radii }: Props) {
  const trees = useMemo<TreeData[]>(() => {
    const out: TreeData[] = []
    let idx = 0
    // Place trees between each pair of tracks and around outer edge
    const bands = [
      { inner: radii[0] + 0.2, outer: radii[1] - 0.2 },
      { inner: radii[1] + 0.2, outer: radii[2] - 0.2 },
      { inner: radii[2] + 0.2, outer: radii[3] - 0.2 },
      { inner: radii[3] + 0.2, outer: radii[4] - 0.2 },
    ]

    bands.forEach((band, bi) => {
      const count = 18 + bi * 4
      for (let i = 0; i < count; i++) {
        const r = randomSeed(idx++) * (band.outer - band.inner) + band.inner
        const angle = randomSeed(idx++) * Math.PI // semicircle
        const x = r * Math.cos(angle)
        const z = -r * Math.sin(angle)
        out.push({
          x,
          y: 0,
          z,
          scale: 0.15 + randomSeed(idx++) * 0.2,
          shade: randomSeed(idx++),
        })
      }
    })

    // Inner circle trees
    for (let i = 0; i < 10; i++) {
      const r = randomSeed(idx++) * (radii[0] - 0.4) + 0.1
      const angle = randomSeed(idx++) * Math.PI
      out.push({
        x: r * Math.cos(angle),
        y: 0,
        z: -r * Math.sin(angle),
        scale: 0.1 + randomSeed(idx++) * 0.12,
        shade: randomSeed(idx++),
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

function Tree({ x, z, scale, shade }: { x: number; z: number; scale: number; shade: number }) {
  const green = useMemo(
    () => new THREE.Color().setHSL(0.32 + shade * 0.05, 0.55 + shade * 0.2, 0.22 + shade * 0.12),
    [shade]
  )
  const trunkColor = '#5a3a1a'
  const h = scale * 1.0
  const r = scale * 0.35

  return (
    <group position={[x, 0, z]}>
      {/* Trunk */}
      <mesh position={[0, h * 0.22, 0]}>
        <cylinderGeometry args={[r * 0.15, r * 0.2, h * 0.45, 5]} />
        <meshStandardMaterial color={trunkColor} roughness={1} />
      </mesh>
      {/* Canopy — two stacked cones */}
      <mesh position={[0, h * 0.62, 0]}>
        <coneGeometry args={[r, h * 0.65, 7]} />
        <meshStandardMaterial color={green} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, h * 0.44, 0]}>
        <coneGeometry args={[r * 1.25, h * 0.4, 7]} />
        <meshStandardMaterial color={green} roughness={0.9} flatShading />
      </mesh>
    </group>
  )
}
