import EyebrowLabel from '@/components/ui/EyebrowLabel'
import Reveal from '@/components/ui/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerReveal'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { site, type Certificate } from '@/content/site'

// ── Cert row ──────────────────────────────────────────────────────────────
// Renders as <a> when a URL is available, plain <div> otherwise.

function CertRow({ cert, index }: { cert: Certificate; index: number }) {
  const isLast = index === site.certifications.length - 1

  const shared =
    'group flex items-center gap-5 rounded-lg px-4 py-4 -mx-4 transition-colors duration-150 hover:bg-navy' +
    (isLast ? '' : ' border-b border-border/60')

  const inner = (
    <>
      {/* Index */}
      <span className="font-mono text-xs text-muted shrink-0 transition-colors duration-150 group-hover:text-cream/50">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title + issuer */}
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm text-navy truncate transition-colors duration-150 group-hover:text-cream">
          {cert.title}
        </p>
        <p className="mt-0.5 font-mono text-xs text-muted transition-colors duration-150 group-hover:text-cream/60">
          {cert.issuer}
        </p>
      </div>

      {/* Arrow — only shown when there is a link */}
      {cert.url && (
        <span
          className="shrink-0 font-mono text-base text-navy opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:text-cream motion-safe:group-hover:translate-x-1"
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}
    </>
  )

  if (cert.url) {
    return (
      <li>
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className={shared}
          aria-label={`${cert.title} by ${cert.issuer} — opens in new tab`}
        >
          {inner}
        </a>
      </li>
    )
  }

  return (
    <li>
      <div className={shared}>{inner}</div>
    </li>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

export default function Certifications() {
  const count = site.certifications.length

  return (
    <SectionWrapper id="certifications">
      <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-2 lg:gap-20">

        {/* ── Left: sticky heading ──────────────────────────────────── */}
        <StaggerGroup className="lg:sticky lg:top-12">
          <StaggerItem>
            <EyebrowLabel number="04" label="Certifications" className="mb-8" />
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-heading font-black leading-tight tracking-tight text-navy text-[clamp(2rem,3.5vw,2.75rem)]">
              Always{' '}
              <em className="font-accent not-italic italic text-muted">learning</em>.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {count} certification{count !== 1 ? 's' : ''} and counting.
            </p>
          </StaggerItem>
        </StaggerGroup>

        {/* ── Right: numbered cert list ─────────────────────────────── */}
        <Reveal delay={0.14}>
          <ul>
            {site.certifications.map((cert, i) => (
              <CertRow key={cert.title} cert={cert} index={i} />
            ))}
          </ul>
        </Reveal>

      </div>
    </SectionWrapper>
  )
}
