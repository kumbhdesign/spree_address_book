'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { siteConfig } from '@/config/siteConfig'
import type { HoveredTrain } from '../HeroSection'
import TrackWithTrain from './TrackWithTrain'
import Ground from './Ground'
import Trees from './Trees'
import Buildings from './Buildings'
import Tunnel from './Tunnel'

// Concentric radii — Track 1 innermost, Track 5 outermost
export const TRACK_RADII = [2.5, 3.8, 5.1, 6.4, 7.7]

// Base speeds (full lap per second at scale 1.0)
// Track 1 slowest → Track 5 fastest
export const BASE_SPEEDS = [0.009, 0.016, 0.028, 0.048, 0.082]

interface Props {
  hoveredTrain: HoveredTrain
  setHoveredTrain: (t: HoveredTrain) => void
}

export default function TrainScene({ hoveredTrain, setHoveredTrain }: Props) {
  const { camera } = useThree()

  // Aim camera at scene centre
  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 1, -5))
  }, [camera])

  return (
    <>
      {/* White fog blends the horizon seamlessly */}
      <fog attach="fog" args={['#ffffff', 25, 55]} />

      {/* Warm key light from upper-left */}
      <ambientLight intensity={0.65} color="#ffffff" />
      <directionalLight
        position={[10, 28, 12]}
        intensity={1.4}
        color="#fff6e8"
        castShadow={false}
      />
      {/* Cool fill light from opposite side */}
      <directionalLight position={[-8, 12, -4]} intensity={0.35} color="#d8eeff" />
      {/* Gentle bounce from below */}
      <hemisphereLight args={['#e8f0ff', '#c8d0a0', 0.3]} />

      <Ground />
      <Trees radii={TRACK_RADII} />

      {siteConfig.trains.map((trainData, i) => (
        <TrackWithTrain
          key={trainData.id}
          trainData={trainData}
          radius={TRACK_RADII[i]}
          speed={BASE_SPEEDS[i]}
          trackIndex={i}
          hoveredTrain={hoveredTrain}
          setHoveredTrain={setHoveredTrain}
        />
      ))}

      <Buildings outerRadius={TRACK_RADII[4]} />
      <Tunnel radius={TRACK_RADII[4]} />
    </>
  )
}
