'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/siteConfig'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[var(--header-height)] flex items-center justify-between">

        {/* Logo */}
        <a href={siteConfig.logo.href} className="flex flex-col leading-none group select-none">
          <span className="text-[18px] font-bold tracking-[0.18em] text-gray-900 transition-opacity duration-300 group-hover:opacity-60">
            {siteConfig.logo.text}
          </span>
          <span className="text-[9px] tracking-[0.22em] text-gray-400 uppercase mt-0.5">
            {siteConfig.logo.tagline}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[13px] tracking-[0.06em] text-gray-500 hover:text-gray-900 transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gray-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4"
        >
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-900 py-1 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
