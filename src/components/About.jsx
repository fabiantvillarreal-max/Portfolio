import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const STATS = [
  { value: '93/100', label: 'GPA' },
  { value: '3+', label: 'Years Coding' },
  { value: 'BizPro', label: 'Current Job' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">About</p>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start">
          {/* Left — bio */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-8">
              CS student building<br />
              real-world software.
            </h2>
            <p className="text-muted leading-[1.8] max-w-xl text-base">
              I'm a Computer Science student at Tecnológico de Monterrey with a focus on
              full-stack development. I design and ship complete systems — clean REST APIs,
              well-structured databases, and responsive frontends — with an emphasis on
              maintainable architecture and developer ergonomics.
            </p>
          </div>

          {/* Right — stats */}
          <div className="flex md:flex-col flex-row flex-wrap gap-8 md:gap-10 pt-1">
            {STATS.map(({ value, label }) => (
              <div key={label} className="border-t border-border pt-4 min-w-[90px]">
                <p className="font-display text-3xl font-extrabold text-text mb-1 leading-none">
                  {value}
                </p>
                <p className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
