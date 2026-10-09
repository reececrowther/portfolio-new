'use client'

import { useEffect, useState } from 'react'
import { motion, LayoutGroup } from 'motion/react'

const NAV_ITEMS = [
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Work',         id: 'work' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact',      id: 'contact' },
]

function scrollToSection(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

export default function PillNav() {
  const [active, setActive] = useState<string>('about')

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-1 rounded-pill bg-cream/85 px-2 py-2 shadow-nav backdrop-blur-md border border-border"
    >
      <LayoutGroup>
        {NAV_ITEMS.map(({ label, id }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              aria-current={isActive ? 'location' : undefined}
              className="relative cursor-pointer rounded-pill px-4 py-1.5 text-sm font-mono transition-colors duration-150 focus-visible:outline-offset-0"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-pill bg-navy"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-cream' : 'text-navy'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </LayoutGroup>
    </nav>
  )
}
