'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/siteConfig'
import type { TrainData } from '@/config/siteConfig'
import TrainPopup from './ui/TrainPopup'

// Load the heavy WebGL canvas only on client, never server-side
const TrainCanvas = dynamic(() => import('./TrainCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-white" />,
})

export type HoveredTrain = TrainData | null

export default function HeroSection() {
  const [hoveredTrain, setHoveredTrain] = useState<HoveredTrain>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-white select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Three.js Canvas */}
      <TrainCanvas hoveredTrain={hoveredTrain} setHoveredTrain={setHoveredTrain} />

      {/* Horizon gradient — white fades up from bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.6) 60%, transparent 100%)' }}
      />

      {/* Top gradient — subtle fade from header */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 100%)' }}
      />

      {/* Cinematic dim overlay when train hovered */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-20"
        animate={{ opacity: hoveredTrain ? 0.18 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Train hover popup */}
      <AnimatePresence>
        {hoveredTrain && (
          <TrainPopup train={hoveredTrain} mousePos={mousePos} />
        )}
      </AnimatePresence>
    </section>
  )
}
