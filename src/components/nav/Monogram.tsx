import { site } from '@/content/site'

export default function Monogram() {
  return (
    <a
      href="#hero"
      aria-label="Back to top"
      className="fixed top-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-cream font-heading font-black text-sm tracking-tight shadow-nav transition-transform hover:scale-105 focus-visible:outline-offset-4"
    >
      {site.profile.initials}
    </a>
  )
}
