import { siGithub, siX } from 'simple-icons'
import { site } from '@/content/site'
import EyebrowLabel from '@/components/ui/EyebrowLabel'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerReveal'
import SectionWrapper from '@/components/ui/SectionWrapper'

// ── Social icon map ───────────────────────────────────────────────────────
// LinkedIn was removed from simple-icons; use an inline path from the brand.

const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const SOCIAL_ICONS: Record<string, { path: string; hex: string }> = {
  github:   { path: siGithub.path, hex: siGithub.hex },
  linkedin: { path: LINKEDIN_PATH, hex: '0A66C2' },
  twitter:  { path: siX.path,      hex: siX.hex },
}

// ── Sub-components ────────────────────────────────────────────────────────

function SocialRow({
  label,
  url,
  icon,
}: {
  label: string
  url: string
  icon: string
}) {
  const si = SOCIAL_ICONS[icon]

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-border px-5 py-4 transition-colors duration-150 hover:border-navy hover:bg-navy"
      aria-label={`${label} — opens in new tab`}
    >
      <div className="flex items-center gap-3">
        {si && (
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            fill="currentColor"
            className="shrink-0 text-navy transition-colors duration-150 group-hover:text-cream"
          >
            <path d={si.path} />
          </svg>
        )}
        <span className="font-heading font-semibold text-sm text-navy transition-colors duration-150 group-hover:text-cream">
          {label}
        </span>
      </div>
      <span
        className="font-mono text-navy opacity-40 transition-all duration-150 group-hover:opacity-100 group-hover:text-cream motion-safe:group-hover:translate-x-1"
        aria-hidden="true"
      >
        &rarr;
      </span>
    </a>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <StaggerGroup>
        <StaggerItem>
          <EyebrowLabel number="07" label="Contact" className="mb-8" />
        </StaggerItem>
      </StaggerGroup>

      <div className="grid grid-cols-1 gap-16 items-start lg:grid-cols-2 lg:gap-20">

        {/* ── Left: heading + email CTA ─────────────────────────────── */}
        <StaggerGroup delay={0.08}>
          <StaggerItem>
            <h2 className="font-heading font-black leading-tight tracking-tight text-navy text-[clamp(2rem,3.5vw,2.75rem)]">
              Let&rsquo;s build something{' '}
              <em className="font-accent not-italic italic text-muted">together</em>.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Open to internships, collaborations, and interesting problems. Drop me a line.
            </p>
          </StaggerItem>
          <StaggerItem>
            <a
              href={`mailto:${site.profile.email}`}
              className="group mt-8 inline-block"
            >
              <span className="break-all font-heading font-black text-lg text-navy transition-colors duration-150 group-hover:text-muted md:text-2xl">
                {site.profile.email}
              </span>
              <span
                className="mt-1 block h-0.5 w-0 rounded-full bg-navy motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </a>
          </StaggerItem>
        </StaggerGroup>

        {/* ── Right: location + social links ───────────────────────── */}
        <StaggerGroup delay={0.2}>
          <StaggerItem>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              Based in {site.profile.location}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col gap-2">
              {site.socials.map((social) => (
                <SocialRow
                  key={social.label}
                  label={social.label}
                  url={social.url}
                  icon={social.icon}
                />
              ))}
            </div>
          </StaggerItem>
        </StaggerGroup>

      </div>
    </SectionWrapper>
  )
}
