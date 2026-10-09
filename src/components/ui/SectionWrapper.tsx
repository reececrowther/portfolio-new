import type { ReactNode } from 'react'

interface Props {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: Props) {
  const label = id.charAt(0).toUpperCase() + id.slice(1)
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative py-14 lg:py-24 px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  )
}
