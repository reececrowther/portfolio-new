'use client'

import { useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import { site, type Project, type SkillFamily } from '@/content/site'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import PillButton from '@/components/ui/PillButton'
import Reveal from '@/components/ui/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerReveal'
import SectionWrapper from '@/components/ui/SectionWrapper'

// ── Heatmap ───────────────────────────────────────────────────────────────
// 20 columns (weeks) × 7 rows (days of week); values 0–4 = activity level.
// Hardcoded so the render is deterministic (no hydration mismatch).
const HEATMAP: number[][] = [
  [0,1,2,3,2,0,0], [0,2,3,4,3,1,0], [0,1,2,2,1,0,0], [0,0,1,2,3,0,0],
  [0,2,3,4,2,1,0], [0,1,1,2,2,0,0], [0,3,4,4,3,1,0], [0,0,1,1,2,0,0],
  [0,2,3,3,4,0,0], [0,1,2,4,3,2,0], [0,0,1,2,1,0,0], [0,2,3,4,4,1,0],
  [0,1,2,3,2,0,0], [0,0,0,1,2,0,0], [0,2,4,4,3,1,0], [0,1,2,2,1,0,0],
  [0,3,4,3,4,0,0], [0,0,1,2,3,0,0], [0,2,3,4,2,1,0], [0,1,2,3,2,0,0],
]
const CELL_COLOURS = ['bg-border', 'bg-navy/15', 'bg-navy/30', 'bg-navy/55', 'bg-navy/80']

// ── Tech-chip dot colours ─────────────────────────────────────────────────
// Full class names so Tailwind's scanner picks them up.
const FAMILY_DOT: Record<SkillFamily, string> = {
  Languages: 'bg-skill-languages',
  Frontend:  'bg-skill-frontend',
  Backend:   'bg-skill-backend',
  Databases: 'bg-skill-databases',
  Tools:     'bg-skill-tools',
  Core:      'bg-skill-core',
}

// ── Sub-components ────────────────────────────────────────────────────────

function HeatmapVisual() {
  return (
    <div className="relative inline-block pb-14">
      {/* Cell grid */}
      <div className="flex gap-0.5" aria-hidden="true">
        {HEATMAP.map((week, w) => (
          <div key={w} className="flex flex-col gap-0.5">
            {week.map((level, d) => (
              <div
                key={d}
                className={`h-3 w-3 rounded-[2px] ${CELL_COLOURS[level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend card — anchored below-right of grid */}
      <div className="absolute bottom-0 right-0 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
        <p className="mb-1.5 font-mono text-[8px] uppercase tracking-wider text-muted">
          Activity
        </p>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[7px] text-muted">Less</span>
          {CELL_COLOURS.map((cls, i) => (
            <div key={i} className={`h-2.5 w-2.5 rounded-[2px] ${cls}`} />
          ))}
          <span className="font-mono text-[7px] text-muted">More</span>
        </div>
      </div>
    </div>
  )
}

function PlaceholderVisual({ title }: { title: string }) {
  return (
    <div className="flex h-36 w-full items-center justify-center rounded-card border border-dashed border-border">
      <p className="font-heading font-black text-xl text-navy/20">{title}</p>
    </div>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  return project.visual === 'heatmap'
    ? <HeatmapVisual />
    : <PlaceholderVisual title={project.title} />
}

function TechChips({ tech }: { tech: string[] }) {
  const MAX = 6
  const visible = tech.slice(0, MAX)
  const overflow = tech.length - MAX

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((name) => {
        const skill = site.skills.find((s) => s.name === name)
        const dot = skill ? FAMILY_DOT[skill.family] : 'bg-muted-light'
        return (
          <span
            key={name}
            className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-xs text-navy"
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
            {name}
          </span>
        )
      })}
      {overflow > 0 && (
        <span className="flex items-center rounded-full bg-muted-light/30 px-2.5 py-1 font-mono text-xs text-muted">
          +{overflow}
        </span>
      )}
    </div>
  )
}

// Left half of the expanded accordion card
function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-7">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {project.category}
        </p>
        <h3 className="mt-1.5 font-heading font-black text-xl leading-tight text-navy">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-2" aria-label="Highlights">
        {project.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-muted">
            <span
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-light"
              aria-hidden="true"
            />
            {b}
          </li>
        ))}
      </ul>

      <TechChips tech={project.tech} />

      <div className="mt-auto flex flex-wrap gap-2">
        {project.siteUrl && (
          <PillButton
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Site ↗
          </PillButton>
        )}
        <PillButton
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant={project.siteUrl ? 'ghost' : 'primary'}
        >
          GitHub ↗
        </PillButton>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

export default function Work() {
  const [activeId, setActiveId] = useState<number>(site.projects[0].id)

  return (
    <SectionWrapper id="work">
      <StaggerGroup className="mb-10">
        <StaggerItem>
          <EyebrowLabel number="03" label="Work" className="mb-8" />
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-heading font-black leading-tight tracking-tight text-navy text-[clamp(2rem,3.5vw,2.75rem)]">
            Things I&rsquo;ve{' '}
            <em className="font-accent not-italic italic text-muted">built</em>.
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            A selection of projects across the stack. Hover or click a panel to expand.
          </p>
        </StaggerItem>
      </StaggerGroup>

      {/* ── Desktop: horizontal accordion ─────────────────────────────── */}
      <Reveal delay={0.12}>
      <div className="hidden md:block">
        <LayoutGroup>
          <div className="flex h-[480px] gap-3">
            {site.projects.map((project) => {
              const isActive = activeId === project.id
              return (
                <motion.div
                  key={project.id}
                  layout
                  transition={{
                    layout: { type: 'spring', stiffness: 300, damping: 36 },
                  }}
                  className={`relative overflow-hidden rounded-card border bg-card shadow-card cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'flex-1 border-border'
                      : 'w-14 shrink-0 border-border hover:border-navy/25 hover:bg-butter/40'
                  }`}
                  onMouseEnter={() => setActiveId(project.id)}
                  onClick={() => setActiveId(project.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveId(project.id)
                    }
                  }}
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={
                    isActive
                      ? `${project.title} — expanded`
                      : `${project.title} — press Enter or click to expand`
                  }
                >
                  {/* ── Collapsed strip: index number + rotated title ─── */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-between py-6 motion-safe:transition-opacity motion-safe:duration-150 ${
                      isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                    aria-hidden={isActive}
                  >
                    <span className="font-mono text-[9px] text-muted">
                      {String(project.id).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                      className="font-heading font-black text-sm tracking-tight text-navy"
                    >
                      {project.title}
                    </span>
                  </div>

                  {/* ── Expanded card: details left, visual right ──────── */}
                  {/*
                    Delay-200 means the content waits for the spring to mostly
                    settle before fading in, hiding the brief scaleX distortion
                    that Motion's layout animation produces.
                  */}
                  <div
                    className={`absolute inset-0 flex motion-safe:transition-opacity motion-safe:duration-200 motion-safe:delay-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-hidden={!isActive}
                  >
                    {/* Left: project details */}
                    <div className="w-[46%] shrink-0 border-r border-border">
                      <ProjectDetails project={project} />
                    </div>
                    {/* Right: visual mock */}
                    <div className="flex flex-1 items-center justify-center bg-butter/25 p-10">
                      <ProjectVisual project={project} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* ── Mobile: vertical stack, all cards expanded ─────────────────── */}
      <div className="space-y-4 md:hidden" aria-label="Projects">
        {site.projects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-card border border-border bg-card shadow-card"
          >
            <div className="border-b border-border px-6 py-4">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {project.category}
              </p>
              <h3 className="mt-1 font-heading font-black text-xl text-navy">
                {project.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <ul className="mt-4 space-y-2">
                {project.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-muted">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-light"
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <TechChips tech={project.tech} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.siteUrl && (
                  <PillButton
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Site ↗
                  </PillButton>
                )}
                <PillButton
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={project.siteUrl ? 'ghost' : 'primary'}
                >
                  GitHub ↗
                </PillButton>
              </div>
            </div>
          </article>
        ))}
      </div>
      </Reveal>
    </SectionWrapper>
  )
}
