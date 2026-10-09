'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import PillButton from '@/components/ui/PillButton'
import IdBadge from '@/components/ui/IdBadge'
import { site } from '@/content/site'

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'start start'],
  })

  const col1Opacity = useTransform(scrollYProgress, [0.52, 0.76], [0, 1])
  const col1Y       = useTransform(scrollYProgress, [0.52, 0.82], [36, 0])

  const col2Opacity = useTransform(scrollYProgress, [0.62, 0.86], [0, 1])
  const col2Y       = useTransform(scrollYProgress, [0.62, 0.92], [36, 0])

  const col3Opacity = useTransform(scrollYProgress, [0.72, 0.96], [0, 1])
  const col3Y       = useTransform(scrollYProgress, [0.72, 1.00], [36, 0])

  return (
    <div ref={wrapperRef}>
      <SectionWrapper id="about">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-10 items-start">

          {/* ── Left: bio ─────────────────────────────────────────────── */}
          <motion.div style={{ opacity: col1Opacity, y: col1Y }}>
            {/* Eyebrow — inlined for direct colour control against the nebula */}
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-8">
              <span>01</span>
              <span className="block h-px w-8 bg-white/40" aria-hidden="true" />
              <span>About</span>
            </div>

            <h2 className="font-heading font-black leading-tight tracking-tight text-white text-[clamp(2rem,3.5vw,2.75rem)]">
              Hi, I&rsquo;m{' '}
              <em className="font-accent not-italic italic text-white/70">
                {site.profile.firstName}
              </em>
              .
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70">
              {site.profile.bio.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton
                href={site.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="!bg-white !text-navy hover:!bg-white/90"
              >
                R&eacute;sum&eacute; &darr;
              </PillButton>
              <PillButton
                variant="ghost"
                href={site.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="!border-white/40 !text-white hover:!bg-white/10 hover:!text-white"
              >
                GitHub ↗
              </PillButton>
              <PillButton
                variant="ghost"
                href={site.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="!border-white/40 !text-white hover:!bg-white/10 hover:!text-white"
              >
                LinkedIn ↗
              </PillButton>
            </div>
          </motion.div>

          {/* ── Centre: ID badge ───────────────────────────────────────── */}
          <motion.div
            style={{ opacity: col2Opacity, y: col2Y }}
            className="flex justify-center lg:pt-4"
          >
            <IdBadge />
          </motion.div>

          {/* ── Right: quick facts + pull quote ───────────────────────── */}
          <motion.div style={{ opacity: col3Opacity, y: col3Y }}>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-navy/60 lg:text-white/60">
              Quick Facts
            </p>

            <ul>
              {site.quickFacts.map((fact, i) => (
                <li
                  key={fact.label}
                  className={`flex flex-col gap-1 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${
                    i < site.quickFacts.length - 1 ? 'border-b border-navy/15 lg:border-white/15' : ''
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-navy/55 lg:text-white/60">
                    {fact.label}
                  </span>
                  <span className="font-heading font-medium text-sm text-navy lg:text-white sm:text-right">
                    {fact.value}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-10 border-l-2 border-navy/30 pl-4 lg:border-white/30">
              <p className="font-accent italic text-lg leading-relaxed text-muted lg:text-white/65">
                {site.badge.pullQuote}
              </p>
            </blockquote>
          </motion.div>

        </div>
      </SectionWrapper>
    </div>
  )
}
