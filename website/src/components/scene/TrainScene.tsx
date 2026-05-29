'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SoftShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { siteConfig } from '@/config/siteConfig'
import type { HoveredTrain } from '../HeroSection'
import TrackWithTrain from './TrackWithTrain'
import Ground from './Ground'
import Trees from './Trees'
import Buildings from './Buildings'
import Tunnel from './Tunnel'

export const TRACK_RADII = [2.5, 3.8, 5.1, 6.4, 7.7]
export const BASE_SPEEDS = [0.0117, 0.0208, 0.0364, 0.0624, 0.1066]

interface Props {
  hoveredTrain: HoveredTrain
  setHoveredTrain: (t: HoveredTrain) => void
}

export default function TrainScene({ hoveredTrain, setHoveredTrain }: Props) {
  const { camera } = useThree()

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 0, -4))
  }, [camera])

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#ffffff', 26, 50]} />

      {/* Soft PCF shadow kernel */}
      <SoftShadows size={20} samples={12} focus={0.1} />

      {/* Ambient — kept low so shadows read clearly */}
      <ambientLight intensity={0.55} color="#f8f4ee" />
      {/* Key light — casts shadows across the full diorama */}
      <directionalLight
        position={[6, 28, 10]}
        intensity={2.2}
        color="#fff4e8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={65}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0004}
      />
      {/* Front fill */}
      <directionalLight position={[0, 8, 22]} intensity={0.55} color="#f0f4ff" />
      {/* Left rim */}
      <directionalLight position={[-14, 14, -2]} intensity={0.32} color="#e8eeff" />
      {/* Sky/ground bounce */}
      <hemisphereLight args={['#e8f0f8', '#c8d8b0', 0.45]} />

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

      {/* Post-processing — Bloom + Vignette only (SSAO removed, unstable in postprocessing v7) */}
      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.72} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.14} darkness={0.55} />
      </EffectComposer>
    </>
  )
}
