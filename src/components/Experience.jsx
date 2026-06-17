import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const ENTRIES = [
  {
    index: '01',
    date: 'Oct 2024 – Present',
    title: 'Software Developer',
    org: 'BizPro',
    sub: 'Part-Time · Monterrey, México',
    bullets: [
      'Maintain and enhance production web and mobile applications across the full stack.',
      'Implement new features end-to-end — from database schema changes to frontend UI.',
      'Optimize relational database schemas to preserve data integrity.',
    ],
  },
  {
    index: '02',
    date: 'Aug – Dec 2025',
    title: 'International Exchange',
    org: 'Sungkyunkwan University (SKKU)',
    sub: 'Suwon, South Korea',
    bullets: [
      'Coursework: Systems Architecture, Advanced Databases.',
    ],
  },
  {
    index: '03',
    date: 'Aug 2022 – Jun 2026',
    title: "B.S. Computer Science",
    org: 'Tecnológico de Monterrey',
    sub: 'GPA 93 / 100',
    bullets: [
      'Coursework: Data Structures & Algorithms, OOP, Computational Methods.',
    ],
  },
]

function Entry({ entry, i }) {
  const [hovered, setHovered] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-t border-border group cursor-default"
    >
      {/* Hover background */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-surface pointer-events-none"
      />

      <div className="relative grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr_10rem] gap-x-8 py-8 md:py-10">
        {/* Index */}
        <span className="font-mono text-xs text-muted/40 pt-1 group-hover:text-accent transition-colors duration-300">
          {entry.index}
        </span>

        {/* Main content */}
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-text leading-tight mb-1 group-hover:text-accent transition-colors duration-300">
            {entry.title}
          </h3>
          <p className="font-mono text-xs text-muted tracking-wide mb-1">{entry.org}</p>
          <p className="font-mono text-[10px] text-muted/50 tracking-wide mb-5">{entry.sub}</p>

          <ul className="space-y-2.5">
            {entry.bullets.map((b) => (
              <li key={b} className="text-sm text-muted leading-relaxed flex gap-3">
                <span className="text-accent shrink-0 mt-[5px] text-[7px]">▸</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Date — desktop only */}
        <div className="hidden md:flex justify-end pt-1">
          <span className="font-mono text-[10px] text-muted/50 tracking-[0.15em] text-right leading-relaxed">
            {entry.date}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
      <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">Experience</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-16">
        Where I've been.
      </h2>

      <div>
        {ENTRIES.map((entry, i) => (
          <Entry key={entry.index} entry={entry} i={i} />
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
