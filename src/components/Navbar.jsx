import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-bg/96 backdrop-blur-sm border-b border-border'
          : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Wordmark */}
        <a
          href="#"
          className="font-display font-extrabold text-sm tracking-[0.2em] uppercase text-accent hover:opacity-75 transition-opacity"
        >
          FT
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono text-xs text-muted hover:text-text transition-colors duration-200 tracking-widest uppercase"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-1 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-muted transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2.5 bg-accent' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-muted transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-muted transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2.5 bg-accent' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden px-6 pb-6 border-t border-border"
        >
          <ul className="flex flex-col gap-5 pt-5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
