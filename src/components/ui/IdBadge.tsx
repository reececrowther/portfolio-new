'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { site } from '@/content/site'

// Set to false to disable the idle sway animation
const IDLE_SWAY = true

// ─── Sub-components ────────────────────────────────────────────────────────

function SmallMonogram() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream/25 font-heading font-black text-[9px] text-cream">
      {site.profile.initials}
    </div>
  )
}

function TickIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="1.5,6.5 5,10 11.5,2.5" />
    </svg>
  )
}

function Barcode() {
  // Alternating bar widths: even indices are black bars, odd are white gaps
  const widths = [2, 1, 3, 1, 2, 1, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 1, 3, 1]
  const totalUnits = widths.reduce((a, b) => a + b, 0)

  let x = 0
  const bars: React.ReactElement[] = []
  widths.forEach((w, i) => {
    if (i % 2 === 0) {
      bars.push(<rect key={i} x={x} y={0} width={w} height={28} fill="currentColor" />)
    }
    x += w
  })

  return (
    <svg
      viewBox={`0 0 ${totalUnits} 28`}
      className="w-full h-6"
      aria-hidden="true"
    >
      {bars}
    </svg>
  )
}

// ─── Badge faces ───────────────────────────────────────────────────────────

function BadgeFront() {
  const fields: [string, string][] = [
    ['ID',    site.badge.idNumber],
    ['Dept',  site.badge.department],
    ['Valid', site.badge.validTill],
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-card">
      {/* Header bar */}
      <div className="flex items-center gap-2 bg-navy px-3 py-2.5">
        <SmallMonogram />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/80">
          Developer ID
        </span>
      </div>

      {/* Photo placeholder */}
      <div className="mx-auto mt-4 flex h-24 w-20 items-center justify-center rounded-md border border-border bg-muted-light/20">
        <span className="font-heading font-black text-2xl text-muted">
          {site.profile.initials}
        </span>
      </div>

      {/* Name & role */}
      <div className="mt-3 px-4 text-center">
        <p className="font-heading font-black text-sm leading-tight text-navy">
          {site.profile.fullName}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">
          {site.profile.role.replace('.', '')}
        </p>
      </div>

      {/* Fields */}
      <div className="mx-4 mt-3 space-y-1.5 border-t border-border pt-3">
        {fields.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
              {label}
            </span>
            <span className="font-mono text-[9px] text-navy">{value}</span>
          </div>
        ))}
      </div>

      {/* Barcode */}
      <div className="mx-4 mt-auto mb-4 pt-4 text-navy/60">
        <Barcode />
        <p className="mt-1 text-center font-mono text-[7px] tracking-[0.25em] text-muted">
          {site.badge.idNumber}
        </p>
      </div>
    </div>
  )
}

function BadgeBack() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-card px-4 pt-4 pb-4">
      {/* Label */}
      <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        What I am
      </p>

      {/* Checklist */}
      <ul className="flex-1 space-y-3">
        {site.badge.checkItems.map((item) => (
          <li key={item.title} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-navy">
              <TickIcon />
            </span>
            <div>
              <p className="font-heading font-semibold text-[11px] leading-tight text-navy">
                {item.title}
              </p>
              <p className="mt-0.5 font-mono text-[8px] leading-tight text-muted">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Signature */}
      <div className="mt-4 border-t border-border pt-3 text-right">
        <p className="font-accent italic text-base text-navy/60">
          {site.profile.fullName}
        </p>
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────

export default function IdBadge() {
  const [hovered, setHovered] = useState(false)
  const [toggled, setToggled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const shouldSway = IDLE_SWAY && !prefersReducedMotion
  const flipped = hovered || toggled

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setToggled((t) => !t)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Fixed lanyard strap */}
      <div className="w-px h-20 bg-muted-light" aria-hidden="true" />

      {/* Clip + badge swing together from the top of the clip */}
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        animate={shouldSway ? { rotate: [-1.5, 1.5] } : { rotate: 0 }}
        transition={
          shouldSway
            ? {
                rotate: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2.6,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
      >
        {/* Lanyard clip */}
        <div
          className="h-3 w-10 rounded-t-sm border border-muted-light bg-border"
          aria-hidden="true"
        />

        {/* 3D perspective wrapper */}
        <div style={{ perspective: '1100px' }}>
          {/* Flip container */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              width: '13rem',
              height: '21rem',
              position: 'relative',
              cursor: 'pointer',
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 290, damping: 28 }
            }
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={() => setToggled((t) => !t)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={
              flipped
                ? 'ID badge — showing back. Press Enter or Space to return to front.'
                : 'ID badge — showing front. Press Enter or Space to flip to back.'
            }
            className="rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
          >
            {/* Front face */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
              }}
            >
              <BadgeFront />
            </div>

            {/* Back face — pre-rotated 180° so content reads correctly when flipped */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                position: 'absolute',
                inset: 0,
                transform: 'rotateY(180deg)',
              }}
            >
              <BadgeBack />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
