'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { SimpleIcon } from 'simple-icons'
import {
  siCpanel,
  siExpress,
  siFigma,
  siGit,
  siGoogleanalytics,
  siGreensock,
  siHtml5,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSass,
  siShopify,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siWordpress,
  siWoocommerce,
} from 'simple-icons'
import { SKILL_FAMILIES, site, type Skill, type SkillFamily } from '@/content/site'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import Reveal from '@/components/ui/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerReveal'
import SectionWrapper from '@/components/ui/SectionWrapper'

// ── Icon lookup ───────────────────────────────────────────────────────────
// Only import icons we actually use to keep bundle small.
// Skills without a logoKey entry fall back to their two-letter symbol.

const ICON_MAP: Record<string, SimpleIcon> = {
  javascript:      siJavascript,
  typescript:      siTypescript,
  php:             siPhp,
  python:          siPython,
  html5:           siHtml5,
  sass:            siSass,
  react:           siReact,
  nextdotjs:       siNextdotjs,
  tailwindcss:     siTailwindcss,
  greensock:       siGreensock,
  threedotjs:      siThreedotjs,
  nodedotjs:       siNodedotjs,
  express:         siExpress,
  postgresql:      siPostgresql,
  mysql:           siMysql,
  wordpress:       siWordpress,
  woocommerce:     siWoocommerce,
  shopify:         siShopify,
  figma:           siFigma,
  git:             siGit,
  googleanalytics: siGoogleanalytics,
  cpanel:          siCpanel,
}

// ── Per-family colour maps ────────────────────────────────────────────────
// Full class names (not interpolated) so Tailwind's content scanner picks them up.

const TILE_BG: Record<SkillFamily, string> = {
  Languages: 'bg-skill-languages',
  Frontend:  'bg-skill-frontend',
  Backend:   'bg-skill-backend',
  Databases: 'bg-skill-databases',
  Tools:     'bg-skill-tools',
  Core:      'bg-skill-core',
}

const TILE_TEXT: Record<SkillFamily, string> = {
  Languages: 'text-cream',
  Frontend:  'text-cream',
  Backend:   'text-cream',
  Databases: 'text-cream',
  Tools:     'text-navy',
  Core:      'text-navy',
}

// ── Detail panel ──────────────────────────────────────────────────────────

function DetailPanel({ skill }: { skill: Skill | null }) {
  const icon = skill?.logoKey ? (ICON_MAP[skill.logoKey] ?? null) : null

  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-card border border-border bg-card p-6 lg:min-h-[260px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={skill?.name ?? '__placeholder'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.13 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          {skill ? (
            <>
              {icon ? (
                <svg
                  viewBox="0 0 24 24"
                  width="52"
                  height="52"
                  role="img"
                  aria-label={skill.name}
                >
                  <path d={icon.path} fill={`#${icon.hex}`} />
                </svg>
              ) : (
                <span
                  className="font-heading font-black text-5xl leading-none text-navy"
                  aria-hidden="true"
                >
                  {skill.symbol}
                </span>
              )}
              <p className="font-heading font-black text-lg leading-tight text-navy">
                {skill.name}
              </p>
              <span className="rounded-pill bg-navy px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream">
                {skill.family}
              </span>
            </>
          ) : (
            <p className="font-mono text-xs leading-relaxed text-muted">
              Hover or focus
              <br />a tile to explore.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

export default function Skills() {
  const [activeFamily, setActiveFamily] = useState<SkillFamily | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)

  // Small timeout prevents the panel flickering when keyboard focus
  // moves from one tile to the next (blur fires before focus).
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function toggleFilter(family: SkillFamily) {
    setActiveFamily((prev) => (prev === family ? null : family))
  }

  function handleTileFocus(skill: Skill) {
    clearTimeout(blurTimer.current)
    setHoveredSkill(skill)
  }

  function handleTileBlur() {
    blurTimer.current = setTimeout(() => setHoveredSkill(null), 80)
  }

  return (
    <SectionWrapper id="skills">
      <StaggerGroup>
        <StaggerItem>
          <EyebrowLabel number="02" label="Skills" className="mb-8" />
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-heading font-black leading-tight tracking-tight text-navy text-[clamp(2rem,3.5vw,2.75rem)]">
            Things I{' '}
            <em className="font-accent not-italic italic text-muted">know</em>.
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-[22rem] text-sm leading-relaxed text-muted">
            Technologies I reach for regularly. Filter by category or hover a tile.
          </p>
        </StaggerItem>
      </StaggerGroup>

      {/* Filter chips — each chip staggers in */}
      <motion.div
        role="group"
        aria-label="Filter skills by category"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -28% 0px' }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {SKILL_FAMILIES.map((family) => {
          const isActive = activeFamily === family
          return (
            <motion.div
              key={family}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <button
                onClick={() => toggleFilter(family)}
                aria-pressed={isActive}
                className={`rounded-pill px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-150 ${
                  isActive
                    ? 'bg-navy text-cream'
                    : 'border border-navy/30 text-navy hover:border-navy hover:bg-navy/5'
                }`}
              >
                {family}
              </button>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Grid + detail panel */}
      <Reveal delay={0.14}>
      <div className="mt-10 flex flex-col-reverse gap-8 lg:flex-row lg:items-start">

        {/* ── Skill tile grid ─────────────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2">
            {site.skills.map((skill) => {
              const isFiltered = activeFamily !== null && skill.family !== activeFamily
              return (
                <button
                  key={skill.name}
                  aria-label={`${skill.name} — ${skill.family}`}
                  className={[
                    'relative flex aspect-square flex-col items-center justify-center gap-1 rounded-lg p-2.5 transition-all duration-200',
                    TILE_BG[skill.family],
                    TILE_TEXT[skill.family],
                    isFiltered
                      ? 'opacity-25'
                      : 'opacity-100 motion-safe:hover:scale-[1.08] motion-safe:hover:shadow-card motion-safe:hover:z-10 motion-safe:hover:relative',
                  ].join(' ')}
                  onMouseEnter={() => {
                    clearTimeout(blurTimer.current)
                    setHoveredSkill(skill)
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onFocus={() => handleTileFocus(skill)}
                  onBlur={handleTileBlur}
                >
                  {/* Atomic number */}
                  <span
                    className="absolute left-2.5 top-2 font-mono text-[11px] opacity-60"
                    aria-hidden="true"
                  >
                    {skill.number}
                  </span>

                  {/* Element symbol */}
                  <span
                    className="font-heading font-black leading-none text-[2rem]"
                    aria-hidden="true"
                  >
                    {skill.symbol}
                  </span>

                  {/* Full name */}
                  <span
                    className="max-w-full truncate px-1 font-mono text-[10px] leading-tight"
                    aria-hidden="true"
                  >
                    {skill.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Detail panel ─────────────────────────────────────────────── */}
        <div className="w-full lg:w-52 lg:shrink-0">
          <DetailPanel skill={hoveredSkill} />
        </div>
      </div>
      </Reveal>
    </SectionWrapper>
  )
}
