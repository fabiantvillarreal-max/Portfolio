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
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        {/* Left — text */}
        <div className="flex flex-col">
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
        </div>

        {/* Right — photo */}
        <motion.div
          variants={fadeUp}
          className="shrink-0 mx-auto md:mx-0"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 border border-accent/30" />
            <div className="absolute inset-0 translate-x-3 translate-y-3 border border-accent/15" />
            <img
              src="/foto.jpg"
              alt="Fabián Treviño Villarreal"
              className="relative w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
