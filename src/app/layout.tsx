import type { Metadata } from 'next'
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Monogram from '@/components/nav/Monogram'
import PillNav from '@/components/nav/PillNav'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Full Stack Developer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Skip link — first focusable element in the document */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-1/2 focus:top-4 focus:-translate-x-1/2 focus:z-[200] focus:rounded-pill focus:bg-navy focus:px-6 focus:py-2.5 focus:font-mono focus:text-sm focus:text-cream focus:shadow-nav focus:outline-none"
        >
          Skip to content
        </a>
        <Monogram />
        <PillNav />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
