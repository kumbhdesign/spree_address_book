'use client'

import { motion } from 'framer-motion'
import type { TrainData } from '@/config/siteConfig'

interface Props {
  train: TrainData
  mousePos: { x: number; y: number }
}

export default function TrainPopup({ train, mousePos }: Props) {
  const offsetX = mousePos.x > window.innerWidth * 0.6 ? -280 : 24
  const offsetY = mousePos.y > window.innerHeight * 0.7 ? -200 : 16

  return (
    <motion.div
      key={train.id}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed z-50"
      style={{
        left: mousePos.x + offsetX,
        top: mousePos.y + offsetY,
        width: 256,
      }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: train.accentColor }}
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full text-white"
              style={{ background: train.accentColor }}
            >
              {train.trackLabel}
            </span>
            <span className="text-[11px] text-gray-400 tracking-wide">{train.period}</span>
          </div>

          <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">{train.name}</h3>
          <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{train.description}</p>

          <div className="border-t border-gray-100 pt-3 grid grid-cols-1 gap-1.5">
            <DataRow label="Sleeper" value={train.sleeperType} />
            <DataRow label="Rail" value={train.railType} />
            <DataRow label="Speed" value={train.maxSpeed} highlight />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DataRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] tracking-[0.1em] uppercase text-gray-400">{label}</span>
      <span
        className={`text-[11px] font-medium ${highlight ? 'text-gray-900' : 'text-gray-600'}`}
      >
        {value}
      </span>
    </div>
  )
}
