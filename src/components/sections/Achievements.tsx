'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { site } from '@/content/site'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerReveal'
import SectionWrapper from '@/components/ui/SectionWrapper'


// ── Animated counter ──────────────────────────────────────────────────────

function Counter({ target, reduced }: { target: number; reduced: boolean }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    // When reduced motion is preferred or the element is off-screen, do nothing.
    // The rendered output falls back to `target` directly in the reduced case.
    if (!inView || reduced) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setValue(Math.round(v))
      },
    })
    return controls.stop
  }, [inView, target, reduced])

  // Bypass animated state entirely when reduced motion is active.
  return <span ref={ref}>{(reduced ? target : value).toLocaleString()}</span>
}

// ── Main export ───────────────────────────────────────────────────────────

export default function Achievements() {
  const reduced = useReducedMotion() ?? false

  return (
    <SectionWrapper id="achievements">
      <StaggerGroup className="mb-10">
        <StaggerItem>
          <EyebrowLabel number="06" label="Achievements" className="mb-8" />
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-heading font-black leading-tight tracking-tight text-navy text-[clamp(2rem,3.5vw,2.75rem)]">
            By the{' '}
            <em className="font-accent not-italic italic text-muted">numbers</em>.
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Five years of client work, independent products, and continuous learning — in numbers.
          </p>
        </StaggerItem>
      </StaggerGroup>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.achievements.map((achievement, i) => {
          return (
            <motion.div
              key={achievement.platform}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-card border border-border bg-card p-6 shadow-card flex flex-col gap-4"
            >
              <span className="font-mono text-xs font-bold text-muted uppercase tracking-widest">
                {achievement.platformName}
              </span>

              {/* Animated count */}
              <div>
                <p className="font-heading font-black text-4xl leading-none text-navy tabular-nums">
                  <Counter target={achievement.count} reduced={reduced} />
                  <span className="text-muted/40">+</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  {achievement.label}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-muted mt-auto">
                {achievement.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
