import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Work from '@/components/sections/Work'
import Certifications from '@/components/sections/Certifications'
import Experience from '@/components/sections/Experience'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      {/* Negative margin pulls About up by exactly one viewport height, eliminating
          the dead zone between the hero sticky falling off and About entering view. */}
      <div style={{ marginTop: '-90svh', position: 'relative', zIndex: 21 }}>
        <About />
      </div>
      <Skills />
      <Work />
      <Certifications />
      <Experience />
      <Achievements />
      <Contact />
    </>
  )
}
