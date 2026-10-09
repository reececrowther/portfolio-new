'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

interface GroupProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export function StaggerGroup({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
}: GroupProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -28% 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: ItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
