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
      {/* White base platform */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.85} metalness={0} />
      </mesh>

      {/* White rim/edge */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <ringGeometry args={[8.2, 9.4, 80, 1, 0, Math.PI]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.75} metalness={0} />
      </mesh>

      {/* Main ground disc */}
      <mesh receiveShadow geometry={geom} position={[0, -0.01, 0]}>
        <meshStandardMaterial color="#b8ae90" roughness={0.95} metalness={0} />
      </mesh>

      {/* Center sandy earth */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial color="#c4a068" roughness={0.98} metalness={0} />
      </mesh>

      {/* Green grass — Track 1 to Track 2 */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[2.55, 3.6, 64]} />
        <meshStandardMaterial color="#72b050" roughness={0.98} metalness={0} />
      </mesh>

      {/* Water — between Track 2 and Track 3 */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[3.95, 4.9, 64]} />
        <meshStandardMaterial color="#4a9ec0" roughness={0.04} metalness={0.5} />
      </mesh>

      {/* Green grass — Track 3 zone */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[5.25, 6.2, 64]} />
        <meshStandardMaterial color="#549040" roughness={0.98} metalness={0} />
      </mesh>

      {/* Water — between Track 4 and Track 5 */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[6.55, 7.4, 64]} />
        <meshStandardMaterial color="#4292b0" roughness={0.04} metalness={0.5} />
      </mesh>

      {/* Urban road zone beyond Track 5 */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[7.85, 9.1, 64]} />
        <meshStandardMaterial color="#b0a898" roughness={0.88} metalness={0} />
      </mesh>

      {/* Road strip at front base */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 1.8]}>
        <planeGeometry args={[20, 2.5]} />
        <meshStandardMaterial color="#ccc4b4" roughness={0.88} metalness={0} />
      </mesh>

      {/* Footpath at front */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 3.5]}>
        <planeGeometry args={[20, 1.5]} />
        <meshStandardMaterial color="#e4e0d8" roughness={0.82} metalness={0} />
      </mesh>
    </>
  )
}
