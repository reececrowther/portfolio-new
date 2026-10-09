'use client'

import { motion, useReducedMotion } from 'motion/react'
import { site } from '@/content/site'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerReveal'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <SectionWrapper id="experience">
      <StaggerGroup>
        <StaggerItem>
          <EyebrowLabel number="05" label="Experience" className="mb-8" />
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-heading font-black leading-tight tracking-tight text-navy text-[clamp(2rem,3.5vw,2.75rem)]">
            Education &amp;{' '}
            <em className="font-accent not-italic italic text-muted">experience</em>.
          </h2>
        </StaggerItem>
      </StaggerGroup>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <div className="mt-12">
        {site.timeline.map((entry, i) => {
          const isLast = i === site.timeline.length - 1
          return (
            <motion.div
              key={`${entry.year}-${entry.type}`}
              initial={reduced ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-6"
            >
              {/* ── Dot + connecting line ──────────────────────────────── */}
              <div className="hidden md:flex flex-col items-center">
                <div className="mt-1.5 h-4 w-4 shrink-0 rounded-full border-2 border-navy bg-card" />
                {!isLast && (
                  <div className="mt-2 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>

              {/* ── Entry content ──────────────────────────────────────── */}
              <div className={`flex-1 min-w-0 ${isLast ? '' : 'pb-12'}`}>
                {/* Year + type badge */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono font-black text-4xl leading-none text-navy/15 select-none">
                    {entry.year}
                  </span>
                  <span
                    className={`rounded-pill px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                      entry.type === 'EXPERIENCE'
                        ? 'bg-navy text-cream'
                        : 'border border-navy/40 text-navy'
                    }`}
                  >
                    {entry.type === 'EXPERIENCE' ? 'Experience' : 'Education'}
                  </span>
                </div>

                {/* Card */}
                <div className="rounded-card border border-border bg-card p-6 shadow-card">
                  {/* Header: title + org / dates + location */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-heading font-black text-lg leading-tight text-navy">
                        {entry.title}
                      </h3>
                      <p className="mt-1 font-heading font-medium text-sm text-navy/65">
                        {entry.organisation}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <p className="font-mono text-xs text-muted">{entry.dates}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted/80">
                        {entry.location}
                      </p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="mt-5 space-y-2.5">
                    {entry.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-light"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-butter border border-border px-3 py-1 font-mono text-xs text-navy/70"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
