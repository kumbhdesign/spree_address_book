'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

// Flat terrain — concentric colour zones echoing the track eras
export default function Ground() {
  const geom = useMemo(() => {
    const g = new THREE.CircleGeometry(14, 64)
    // Rotate flat in XZ plane
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  return (
    <>
      {/* Main ground disc */}
      <mesh geometry={geom} receiveShadow position={[0, -0.01, -0]}>
        <meshStandardMaterial color="#c8c8b8" roughness={1} metalness={0} />
      </mesh>

      {/* Inner zone (around Track 1) — dry earth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <circleGeometry args={[2.3, 48]} />
        <meshStandardMaterial color="#b8a888" roughness={1} metalness={0} />
      </mesh>

      {/* Green band between tracks 1-3 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[2.4, 5.0, 64]} />
        <meshStandardMaterial color="#8aaa6a" roughness={1} metalness={0} />
      </mesh>

      {/* Greener band between tracks 3-5 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[5.1, 7.5, 64]} />
        <meshStandardMaterial color="#6a9850" roughness={1} metalness={0} />
      </mesh>

      {/* Outer urban zone beyond Track 5 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
        <ringGeometry args={[7.6, 14, 64]} />
        <meshStandardMaterial color="#c0b898" roughness={1} metalness={0} />
      </mesh>

      {/* Road-like flat strip at the base (viewer edge) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 1.5]}>
        <planeGeometry args={[20, 3]} />
        <meshStandardMaterial color="#b0a890" roughness={1} metalness={0} />
      </mesh>
    </>
  )
}
