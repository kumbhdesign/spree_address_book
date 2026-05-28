'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

// Underground tunnel entrance at the left end of Track 5
// The train fades out as it enters (handled in TrackWithTrain)
// This component renders the visible portal structure

interface Props {
  radius: number
}

export default function Tunnel({ radius }: Props) {
  // Tunnel entrance is at the left end of the semicircle
  // That's angle = PI → position (-radius, 0, 0), facing +Z
  const leftX = -radius
  const leftZ = 0

  // Tunnel exit area is behind the right-side buildings (angle near 0)
  // We place a subtle exit portal on the right at angle ~0.05*PI
  const exitAngle = 0.06 * Math.PI
  const exitX = radius * Math.cos(exitAngle)
  const exitZ = -radius * Math.sin(exitAngle)
  const exitRotY = Math.PI - exitAngle // face along track tangent

  return (
    <group>
      {/* === LEFT ENTRANCE PORTAL === */}
      <group position={[leftX + 0.3, 0, leftZ]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Portal arch outer frame */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.55, 0.7, 0.12]} />
          <meshStandardMaterial color="#5a5a50" roughness={0.85} metalness={0.1} />
        </mesh>
        {/* Portal inner opening (dark) */}
        <mesh position={[0, 0.3, -0.02]}>
          <boxGeometry args={[0.38, 0.52, 0.12]} />
          <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
        </mesh>
        {/* Arch top trim */}
        <mesh position={[0, 0.72, 0]}>
          <boxGeometry args={[0.58, 0.08, 0.14]} />
          <meshStandardMaterial color="#3a3a30" roughness={0.9} metalness={0.1} />
        </mesh>
        {/* Side pillars */}
        <mesh position={[-0.22, 0.3, 0]}>
          <boxGeometry args={[0.1, 0.6, 0.14]} />
          <meshStandardMaterial color="#4a4a40" roughness={0.85} metalness={0.1} />
        </mesh>
        <mesh position={[0.22, 0.3, 0]}>
          <boxGeometry args={[0.1, 0.6, 0.14]} />
          <meshStandardMaterial color="#4a4a40" roughness={0.85} metalness={0.1} />
        </mesh>

        {/* Tunnel hill / embankment */}
        <mesh position={[0, 0.2, -0.4]}>
          <boxGeometry args={[1.2, 0.4, 0.8]} />
          <meshStandardMaterial color="#7a8870" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[0, 0.5, -0.6]}>
          <boxGeometry args={[1.0, 0.6, 0.8]} />
          <meshStandardMaterial color="#6a7860" roughness={1} metalness={0} />
        </mesh>
        {/* Trees on top */}
        <mesh position={[-0.3, 0.9, -0.6]}>
          <coneGeometry args={[0.15, 0.35, 6]} />
          <meshStandardMaterial color="#4a6a3a" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.2, 1.0, -0.5]}>
          <coneGeometry args={[0.18, 0.45, 6]} />
          <meshStandardMaterial color="#5a7a4a" roughness={0.9} flatShading />
        </mesh>
      </group>

      {/* === RIGHT EMERGENCE AREA (behind buildings) === */}
      <group
        position={[exitX + 0.3, 0, exitZ]}
        rotation={[0, Math.PI / 2 - exitAngle, 0]}
      >
        {/* Subtle portal cut into the building base */}
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.52, 0.56, 0.1]} />
          <meshStandardMaterial color="#4a4a3a" roughness={0.9} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.25, -0.02]}>
          <boxGeometry args={[0.36, 0.48, 0.1]} />
          <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
        </mesh>
        {/* Urban wall around exit */}
        <mesh position={[0, 0.3, -0.15]}>
          <boxGeometry args={[0.8, 0.6, 0.3]} />
          <meshStandardMaterial color="#c0b8a8" roughness={0.9} metalness={0.05} />
        </mesh>
      </group>
    </group>
  )
}
