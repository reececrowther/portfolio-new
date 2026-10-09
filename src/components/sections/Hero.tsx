'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { site } from '@/content/site'
import PillButton from '@/components/ui/PillButton'
import type { HeroSceneProps } from '@/components/hero/HeroScene'

const HeroScene = dynamic<HeroSceneProps>(
  () => import('@/components/hero/HeroScene'),
  { ssr: false, loading: () => <div className="absolute inset-0" /> },
)

function scrollToSection(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}

export default function Hero() {
  const reduced = useReducedMotion() ?? false

  const sectionRef = useRef<HTMLElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0])
  const bgOpacity      = useTransform(scrollYProgress, [0.3, 0.72], [0, 1])
  const hintOpacity    = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  function handleMouseLeave() {
    // Lerp naturally back to neutral on next frames
    mouseRef.current = { x: 0, y: 0 }
  }

  return (
    /*
      Outer section is 200vh tall. The sticky inner holds the viewport
      while the user scrolls through the hero animation.
    */
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative"
      style={{ height: '200vh' }}
    >
      <div
        className="sticky top-0 flex h-svh flex-col overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Background — fades in as orb expands ─────────────────────── */}
        <motion.div
          style={{ opacity: bgOpacity, backgroundColor: '#0d1b2a' }}
          className="pointer-events-none absolute inset-0 z-0"
        />

        {/* ── Three.js canvas ───────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10">
          <HeroScene
            reduced={reduced}
            mouseRef={mouseRef}
            scrollYProgress={scrollYProgress}
          />
        </div>

        {/* ── Watermark — fades out early ───────────────────────────────── */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="select-none font-heading font-black leading-none tracking-tighter text-navy/[0.045] text-[clamp(9rem,28vw,26rem)]">
            {site.profile.firstName}
          </span>
        </motion.div>

        {/* ── Bottom bar — fades out early ──────────────────────────────── */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-8 px-6 pb-24 sm:flex-row sm:items-end sm:justify-between max-w-7xl mx-auto w-full"
        >
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/45 sm:text-navy">
              {site.profile.fullName}
            </p>
            <h1 className="font-heading font-black leading-[1.05] tracking-tight text-cream sm:text-navy text-[clamp(2rem,5.5vw,4.5rem)]">
              {site.profile.role}
            </h1>
            <p className="mt-3 max-w-xs text-base text-white/55 sm:text-muted">
              {site.profile.tagline}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <PillButton onClick={() => scrollToSection('work')}>
              Explore work &rarr;
            </PillButton>
            <div className="flex flex-wrap gap-3">
              <PillButton variant="ghost" onClick={() => scrollToSection('contact')}>
                Let&rsquo;s talk
              </PillButton>
              <PillButton
                variant="ghost"
                href={site.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                R&eacute;sum&eacute; &darr;
              </PillButton>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll hint ───────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            scroll
          </span>
          <span className="h-6 w-px bg-muted-light/50" />
        </motion.div>

      </div>
    </section>
  )
}
