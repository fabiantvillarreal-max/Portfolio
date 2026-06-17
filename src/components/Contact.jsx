import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

const LINKS = [
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=fabiantvillarreal@gmail.com',
    Icon: FaEnvelope,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/fabian-trevi%C3%B1o-55ba331b8/',
    Icon: FaLinkedin,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/fabiantvillarreal-max',
    Icon: FaGithub,
    external: true,
  },
]

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">Contact</p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-[1.05] max-w-xs">
            Let's work<br />together.
          </h2>

          <div className="flex items-center gap-6 mb-1">
            {LINKS.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                aria-label={label}
                className="text-muted hover:text-accent transition-colors duration-200"
              >
                <Icon size={26} />
              </a>
            ))}
          </div>
        </div>

        <p className="font-mono text-[10px] text-muted tracking-[0.15em] mt-20">
          © 2026 Fabián Treviño Villarreal · Monterrey, México
        </p>
      </motion.div>
    </section>
  )
}
