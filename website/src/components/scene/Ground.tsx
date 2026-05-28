'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

export default function Ground() {
  const geom = useMemo(() => {
    const g = new THREE.CircleGeometry(13, 80)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  return (
    <>
      {/* White base platform — the "table" the diorama sits on */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.9} metalness={0} />
      </mesh>

      {/* White rim/edge of the semicircle base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <ringGeometry args={[8.2, 9.2, 80, 1, 0, Math.PI]} />
        <meshStandardMaterial color="#efefef" roughness={0.8} metalness={0} />
      </mesh>

      {/* Main ground disc */}
      <mesh geometry={geom} position={[0, -0.01, 0]}>
        <meshStandardMaterial color="#c0b898" roughness={1} metalness={0} />
      </mesh>

      {/* Center sandy earth (Track 1 inner) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial color="#c8a870" roughness={1} metalness={0} />
      </mesh>

      {/* Green grass — Track 1 to Track 2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[2.55, 3.6, 64]} />
        <meshStandardMaterial color="#7ab85a" roughness={1} metalness={0} />
      </mesh>

      {/* Water / river — between Track 2 and Track 3 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[3.95, 4.9, 64]} />
        <meshStandardMaterial color="#5aaac8" roughness={0.05} metalness={0.4} />
      </mesh>

      {/* Green grass — Track 3 zone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[5.25, 6.2, 64]} />
        <meshStandardMaterial color="#5a9848" roughness={1} metalness={0} />
      </mesh>

      {/* Water / river — between Track 4 and Track 5 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[6.55, 7.4, 64]} />
        <meshStandardMaterial color="#4a9abb" roughness={0.05} metalness={0.4} />
      </mesh>

      {/* Urban/road zone beyond Track 5 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[7.85, 9.0, 64]} />
        <meshStandardMaterial color="#b8b0a0" roughness={0.9} metalness={0} />
      </mesh>

      {/* Road strip at front base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 1.8]}>
        <planeGeometry args={[20, 2.5]} />
        <meshStandardMaterial color="#d0c8b8" roughness={0.9} metalness={0} />
      </mesh>

      {/* Footpath at very front */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 3.5]}>
        <planeGeometry args={[20, 1.5]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.85} metalness={0} />
      </mesh>
    </>
  )
}
