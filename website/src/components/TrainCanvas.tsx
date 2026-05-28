'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import TrainScene from './scene/TrainScene'
import type { HoveredTrain } from './HeroSection'

interface Props {
  hoveredTrain: HoveredTrain
  setHoveredTrain: (t: HoveredTrain) => void
}

export default function TrainCanvas({ hoveredTrain, setHoveredTrain }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 17, 9], fov: 58, near: 0.1, far: 300 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, background: '#ffffff' }}
    >
      <Suspense fallback={null}>
        <TrainScene hoveredTrain={hoveredTrain} setHoveredTrain={setHoveredTrain} />
      </Suspense>
    </Canvas>
  )
}
