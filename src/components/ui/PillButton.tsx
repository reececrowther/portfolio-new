import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

interface BaseProps {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never
    target?: never
    rel?: never
  }

type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
    target?: string
    rel?: string
  }

type Props = AsButton | AsLink

function pillClasses(variant: Variant, className = '') {
  const base =
    'inline-flex items-center gap-2 px-6 py-2.5 rounded-pill text-sm font-medium transition-all duration-150 focus-visible:outline-offset-4'
  const variants: Record<Variant, string> = {
    primary: 'bg-navy text-cream hover:bg-navy-light',
    ghost:   'border border-navy text-navy hover:bg-navy hover:text-cream',
  }
  return `${base} ${variants[variant]} ${className}`
}

export default function PillButton({
  variant = 'primary',
  icon,
  children,
  className,
  ...rest
}: Props) {
  if ('href' in rest && rest.href != null) {
    const { href, target, rel, ...linkRest } = rest as AsLink
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={pillClasses(variant, className)}
        {...(linkRest as object)}
      >
        {children}
        {icon}
      </Link>
    )
  }

  return (
    <button
      className={pillClasses(variant, className)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {icon}
    </button>
  )
}
