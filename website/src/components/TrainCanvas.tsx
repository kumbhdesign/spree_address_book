'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import TrainScene from './scene/TrainScene'
import type { HoveredTrain } from './HeroSection'

interface Props {
  hoveredTrain: HoveredTrain
  setHoveredTrain: (t: HoveredTrain) => void
}

export default function TrainCanvas({ hoveredTrain, setHoveredTrain }: Props) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 14, 11], fov: 55, near: 0.1, far: 300 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.15
      }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, background: '#ffffff' }}
    >
      <Suspense fallback={null}>
        <TrainScene hoveredTrain={hoveredTrain} setHoveredTrain={setHoveredTrain} />
      </Suspense>
    </Canvas>
  )
}
