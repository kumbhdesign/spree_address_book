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
export const BASE_SPEEDS = [0.0117, 0.0208, 0.0364, 0.0624, 0.1066]

interface Props {
  hoveredTrain: HoveredTrain
  setHoveredTrain: (t: HoveredTrain) => void
}

export default function TrainScene({ hoveredTrain, setHoveredTrain }: Props) {
  const { camera } = useThree()

  // Aim camera at scene centre
  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 0, -5))
  }, [camera])

  return (
    <>
      {/* White scene background — eliminates black edges */}
      <color attach="background" args={['#ffffff']} />
      {/* White fog — tight to keep edges clean */}
      <fog attach="fog" args={['#ffffff', 22, 44]} />

      {/* Bright ambient for clean diorama look */}
      <ambientLight intensity={0.9} color="#ffffff" />
      {/* Main top-down key light */}
      <directionalLight position={[5, 30, 8]} intensity={2.0} color="#fff8f2" castShadow={false} />
      {/* Front fill — lifts shadows toward viewer */}
      <directionalLight position={[0, 10, 20]} intensity={0.7} color="#f0f4ff" />
      {/* Side fill */}
      <directionalLight position={[-12, 16, -4]} intensity={0.4} color="#e8f0ff" />
      {/* Sky / ground bounce */}
      <hemisphereLight args={['#f0f4ff', '#d8e0c8', 0.5]} />

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
