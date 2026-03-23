import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24 pb-20"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-7"
        >
          Full-Stack Developer · Monterrey, México
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-[clamp(2.6rem,7vw,6rem)] text-text leading-[0.95] tracking-tight mb-8"
        >
          <span className="text-accent">Fabián</span><br />
          Treviño<br />
          Villarreal
        </motion.h1>

        {/* One-liner */}
        <motion.p
          variants={fadeUp}
          className="text-muted text-lg md:text-xl max-w-md leading-relaxed mb-10 font-light"
        >
          Building elegant, performant software — from database schema to responsive UI.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="font-mono text-sm font-bold px-7 py-3.5 bg-accent text-bg tracking-wide hover:bg-accent/90 active:scale-[0.98] transition-all duration-150"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="font-mono text-sm px-7 py-3.5 border border-border text-muted hover:border-accent hover:text-accent active:scale-[0.98] transition-all duration-150 tracking-wide"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Animated vertical line scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ originY: 0 }}
          className="w-px h-14 bg-gradient-to-b from-accent via-accent to-transparent"
        />
        <span className="font-mono text-[9px] text-muted tracking-[0.2em] uppercase rotate-90 mt-2">
          scroll
        </span>
      </motion.div>
    </section>
  )
}
