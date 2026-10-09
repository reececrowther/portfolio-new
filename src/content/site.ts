// ─── Types ───────────────────────────────────────────────────────────────────

export const SKILL_FAMILIES = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Tools',
  'Core',
] as const

export type SkillFamily = (typeof SKILL_FAMILIES)[number]

export interface Profile {
  firstName: string
  lastName: string
  fullName: string
  initials: string
  role: string
  tagline: string
  email: string
  location: string
  bio: string[]
  resumeUrl: string
  github: string
  linkedin: string
}

export interface QuickFact {
  label: string
  value: string
}

export interface BadgeCheckItem {
  title: string
  detail: string
}

export interface BadgeData {
  idNumber: string
  department: string
  validTill: string
  checkItems: [BadgeCheckItem, BadgeCheckItem, BadgeCheckItem, BadgeCheckItem, BadgeCheckItem]
  pullQuote: string
}

export interface Skill {
  number: number
  symbol: string
  name: string
  family: SkillFamily
  logoKey?: string
}

export interface Project {
  id: number
  category: string
  title: string
  description: string
  bullets: string[]
  tech: string[]
  githubUrl: string
  siteUrl?: string
  visual: 'heatmap' | 'placeholder'
}

export interface Certificate {
  title: string
  issuer: string
  url?: string
}

export interface TimelineEntry {
  year: number
  type: 'EDUCATION' | 'EXPERIENCE'
  title: string
  organisation: string
  location: string
  dates: string
  bullets: string[]
  tags: string[]
  highlights?: string[]
}

export interface Achievement {
  platform: string
  platformName: string
  label: string
  description: string
  count: number
}

export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter'
}

export interface SiteData {
  profile: Profile
  quickFacts: QuickFact[]
  badge: BadgeData
  skills: Skill[]
  projects: Project[]
  certifications: Certificate[]
  timeline: TimelineEntry[]
  achievements: Achievement[]
  socials: SocialLink[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const site: SiteData = {
  profile: {
    firstName: 'Reece',
    lastName:  'Crowther',
    fullName:  'Reece Crowther',
    initials:  'RC',
    role:      'Web Developer.',
    tagline:   'Performance, animation, and full-stack web from design to deployment.',
    email:     'reececrowther@hotmail.co.uk',
    location:  'Liverpool, England',
    bio: [
      'Web Developer with 5+ years\' commercial experience building high-performance WordPress, WooCommerce, and full-stack web products for agencies and direct clients. I specialise in front-end animation, site speed optimisation, and technical SEO. Alongside agency work I design, build, and ship my own products from a live SaaS speed-checker to a UK sunset-forecast app.',
    ],
    resumeUrl: '/resume.pdf',
    github:    'https://github.com/reececrowther',
    linkedin:  'https://www.linkedin.com/in/reece-crowther-590451138',
  },

  quickFacts: [
    { label: 'Based in',    value: 'Liverpool, England' },
    { label: 'Currently',   value: 'Web Developer · Platform81' },
    { label: 'Degree',      value: 'BSc Computer Science · 1st' },
    { label: 'Experience',  value: '5+ Years Commercial' },
    { label: 'Speciality',  value: 'Performance · Animation · SEO' },
  ],

  badge: {
    idNumber:   'ID-000001',
    department: 'Engineering',
    validTill:  '2077',
    checkItems: [
      { title: 'Performance-First', detail: 'Obsessed with fast, lean builds'           },
      { title: 'Animation Nerd',    detail: 'GSAP, Motion, WebGL — all of it'           },
      { title: 'Full-Stack Builder',detail: 'Ships products front to back'               },
      { title: 'Always Learning',   detail: 'Currently deep in shaders and Three.js'    },
      { title: 'End-to-End Owner',  detail: 'Figma → dev → hosting → post-launch'       },
    ],
    pullQuote: '"Build it fast, build it well, then make it beautiful."',
  },

  // ── Skills ─────────────────────────────────────────────────────────────────
  // Displayed as a periodic-table-style tile grid in the Skills section.
  // logoKey maps to a simple-icons slug; omit to fall back to the symbol.

  skills: [
    // Languages
    { number: 1,  symbol: 'Js', name: 'JavaScript',        family: 'Languages', logoKey: 'javascript'     },
    { number: 2,  symbol: 'Ts', name: 'TypeScript',        family: 'Languages', logoKey: 'typescript'     },
    { number: 3,  symbol: 'Ph', name: 'PHP',                family: 'Languages', logoKey: 'php'            },
    { number: 4,  symbol: 'Py', name: 'Python',             family: 'Languages', logoKey: 'python'         },
    { number: 5,  symbol: 'Ht', name: 'HTML5',              family: 'Languages', logoKey: 'html5'          },
    { number: 6,  symbol: 'Sc', name: 'CSS / Sass',         family: 'Languages', logoKey: 'sass'           },
    // Frontend
    { number: 7,  symbol: 'Re', name: 'React',              family: 'Frontend',  logoKey: 'react'          },
    { number: 8,  symbol: 'Nx', name: 'Next.js',            family: 'Frontend',  logoKey: 'nextdotjs'      },
    { number: 9,  symbol: 'Tw', name: 'Tailwind',           family: 'Frontend',  logoKey: 'tailwindcss'    },
    { number: 10, symbol: 'Gs', name: 'GSAP',               family: 'Frontend',  logoKey: 'greensock'      },
    { number: 11, symbol: '3j', name: 'Three.js',           family: 'Frontend',  logoKey: 'threedotjs'     },
    // Backend
    { number: 12, symbol: 'No', name: 'Node.js',            family: 'Backend',   logoKey: 'nodedotjs'      },
    { number: 13, symbol: 'Ex', name: 'Express',            family: 'Backend',   logoKey: 'express'        },
    // Databases
    { number: 14, symbol: 'Sq', name: 'SQL',                family: 'Databases'                            },
    { number: 15, symbol: 'Pg', name: 'PostgreSQL',         family: 'Databases', logoKey: 'postgresql'     },
    { number: 16, symbol: 'My', name: 'MySQL',              family: 'Databases', logoKey: 'mysql'          },
    // Tools & platforms
    { number: 17, symbol: 'Wp', name: 'WordPress',          family: 'Tools',     logoKey: 'wordpress'      },
    { number: 18, symbol: 'Wc', name: 'WooCommerce',        family: 'Tools',     logoKey: 'woocommerce'    },
    { number: 19, symbol: 'Sh', name: 'Shopify',            family: 'Tools',     logoKey: 'shopify'        },
    { number: 20, symbol: 'Fi', name: 'Figma',              family: 'Tools',     logoKey: 'figma'          },
    { number: 21, symbol: 'Gi', name: 'Git',                family: 'Tools',     logoKey: 'git'            },
    { number: 22, symbol: 'Ga', name: 'Google Analytics',   family: 'Tools',     logoKey: 'googleanalytics'},
    { number: 23, symbol: 'Cp', name: 'cPanel / Hosting',   family: 'Tools',     logoKey: 'cpanel'         },
    // Core
    { number: 24, symbol: 'Se', name: 'Technical SEO',      family: 'Core'                                 },
    { number: 25, symbol: 'Pf', name: 'Site Performance',   family: 'Core'                                 },
    { number: 26, symbol: 'Sy', name: 'System Design',      family: 'Core'                                 },
    { number: 27, symbol: 'Ds', name: 'Data Structures',    family: 'Core'                                 },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────

  projects: [
    {
      id:          1,
      category:    'SaaS / Web Application',
      title:       'Loadzen',
      description: 'Website speed monitoring and optimisation platform built for agencies. Audits Core Web Vitals, generates prioritised fix plans by platform, and offers competitor comparison with white-label PDF reporting on paid tiers.',
      bullets: [
        'Audits Core Web Vitals and generates a prioritised, platform-specific fix plan (WordPress, Shopify, WooCommerce, Magento)',
        'Competitor comparison — benchmark any site against rivals in one click',
        'White-label PDF reports on paid tiers, branded for agency clients',
        'Live paying customers on a subscription model',
      ],
      tech:      ['React', 'Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Node.js'],
      githubUrl: 'https://github.com/reececrowther/load-zen',
      siteUrl:   'https://loadzen.co.uk/',
      visual:    'placeholder',
    },
    {
      id:          2,
      category:    'Consumer App / Algorithm',
      title:       'Afterglow',
      description: 'UK sunset-quality forecasting app that algorithmically scores locations 0–100 by combining live cloud cover, atmospheric clarity, and visibility data via the Open-Meteo API.',
      bullets: [
        'Scores any UK location 0–100 for sunset quality using a custom algorithm',
        'Combines live cloud cover, atmospheric clarity, and visibility via Open-Meteo API',
        'Location-aware — uses the browser geolocation API for instant results',
        'Minimal, fast UI built to load quickly on mobile',
      ],
      tech:      ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Open-Meteo API'],
      githubUrl: 'https://github.com/reececrowther/Sunsets',
      siteUrl:   'https://sunset-pied.vercel.app/',
      visual:    'heatmap',
    },
    {
      id:          3,
      category:    'Full-Stack App',
      title:       'Life OS',
      description: 'Gamified task and habit tracker built for ADHD brains. Features user accounts, an XP and streak system, and a distraction-free focus-mode dashboard.',
      bullets: [
        'XP and streak system that rewards consistent daily habits',
        'Focus-mode dashboard — strips the UI back to a single task view',
        'Full user authentication with personal data isolation',
        'Mobile-first responsive layout for on-the-go use',
      ],
      tech:      ['React', 'Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
      githubUrl: 'https://github.com/reececrowther/Sunsets',
      siteUrl:   'https://life-os-app-seven.vercel.app/',
      visual:    'placeholder',
    },
  ],

  // ── Certifications / Always Learning ───────────────────────────────────────
  // Displayed in the "Always learning." section (Certifications component).

  certifications: [
    {
      title:  'Three.js Journey',
      issuer: 'Bruno Simon',
      url:    'https://threejs-journey.com',
    },
    {
      title:  'Advanced CSS and Sass',
      issuer: 'Udemy · Jonas Schmedtmann',
      url:    'https://www.udemy.com/course/advanced-css-and-sass/',
    },
    {
      title:  'JavaScript: The Advanced Concepts',
      issuer: 'Udemy · Andrei Neagoie',
    },
    {
      title:  'Google Analytics Certification',
      issuer: 'Google Skillshop',
      url:    'https://skillshop.google.com',
    },
    {
      title:  'Core Web Vitals Optimisation',
      issuer: 'web.dev / Google',
      url:    'https://web.dev/learn-core-web-vitals/',
    },
  ],

  // ── Timeline — Education & Experience ──────────────────────────────────────

  timeline: [
    {
      year:         2024,
      type:         'EXPERIENCE',
      title:        'Web Developer',
      organisation: 'Platform81',
      location:     'Stockport, UK',
      dates:        'Apr 2024 – Present',
      bullets: [
        'Build responsive, high-performance websites for multiple agency clients, from Figma handoff through to deployment.',
        'Implement GSAP animations to enhance engagement without compromising load speed.',
        'Optimise site performance and technical SEO, improving page speed by up to 40% on client builds.',
        'Manage hosting environments and databases, including scaling for traffic and load changes.',
        'Collaborate with designers and clients to deliver builds to spec and on deadline.',
      ],
      tags: ['WordPress', 'WooCommerce', 'GSAP', 'PHP', 'Technical SEO', 'Performance'],
    },
    {
      year:         2021,
      type:         'EXPERIENCE',
      title:        'Web Developer',
      organisation: 'Deliver Media',
      location:     'Remote',
      dates:        'Aug 2021 – Apr 2024',
      bullets: [
        'Sole web developer responsible for bespoke WordPress builds from concept through to deployment, working directly with clients.',
        'Built WooCommerce eCommerce sites from product setup through to checkout.',
        'Converted Figma designs into responsive, pixel-perfect front-end builds.',
        'Improved page speed, technical SEO, and site performance across client sites, supporting increased traffic and conversion rates.',
        'Managed hosting, deployments, and ongoing client environments.',
        'Used Google Analytics to track and report on performance improvements.',
      ],
      tags: ['WordPress', 'WooCommerce', 'Figma', 'JavaScript', 'SEO', 'Google Analytics'],
    },
    {
      year:         2014,
      type:         'EDUCATION',
      title:        'BSc Computer Science (Games Development)',
      organisation: 'University of Chester',
      location:     'Chester, UK',
      dates:        '2014 – 2017',
      bullets: [
        'Graduated with First Class Honours.',
        'Specialist modules in 3D graphics, physics simulation, and game engine architecture alongside core computer science.',
        'Strong foundations in algorithms, data structures, object-oriented programming, and C++.',
      ],
      tags:       ['C++', 'OpenGL', 'Algorithms', 'Data Structures', 'Game Development'],
      highlights: ['★ First Class Honours'],
    },
  ],

  // ── Achievements / By the Numbers ──────────────────────────────────────────

  achievements: [
    {
      platform:     'experience',
      platformName: 'Commercial',
      label:        'YEARS EXPERIENCE',
      description:  'Delivering high-performance websites for agencies and direct clients since 2021.',
      count:        5,
    },
    {
      platform:     'performance',
      platformName: 'Performance',
      label:        '% PAGE SPEED GAIN',
      description:  'Typical page speed improvement achieved on client WordPress and WooCommerce builds.',
      count:        40,
    },
    {
      platform:     'sites',
      platformName: 'Agency',
      label:        'CLIENT SITES SHIPPED',
      description:  'Bespoke builds delivered from Figma handoff through deployment and post-launch support.',
      count:        30,
    },
    {
      platform:     'products',
      platformName: 'Independent',
      label:        'LIVE PRODUCTS',
      description:  'Full-stack web products designed, built, and shipped independently — SaaS to consumer apps.',
      count:        3,
    },
  ],

  // ── Socials ────────────────────────────────────────────────────────────────

  socials: [
    { label: 'GitHub',   url: 'https://github.com/reececrowther',                              icon: 'github'   },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/reece-crowther-590451138',          icon: 'linkedin' },
  ],
}
