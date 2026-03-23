# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Fabián Treviño Villarreal's personal portfolio as a dark-editorial single-page React app.

**Architecture:** Single-page React + Vite app. No routing — smooth-scroll sections via anchor IDs. Fixed minimal navbar. Framer Motion entrance animations triggered by IntersectionObserver. Tailwind CSS with a custom design token config.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, Framer Motion v11, Google Fonts (Syne + Inter)

---

## File Map

```
C:\Users\Fabián Treviño\Desktop\Portafolio\
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                  # Fonts import + Tailwind directives + base
│   ├── hooks/
│   │   └── useInView.js           # IntersectionObserver scroll-trigger hook
│   └── components/
│       ├── Navbar.jsx             # Fixed top nav, transparent→frosted on scroll
│       ├── Hero.jsx               # Full-screen, staggered text entrance
│       ├── About.jsx              # Bio paragraph + stats row
│       ├── Projects.jsx           # 2-col card grid with hover-reveal overlay
│       ├── Skills.jsx             # Grouped pill layout with stagger animation
│       └── Contact.jsx            # Email + LinkedIn + GitHub links, footer
└── docs/superpowers/plans/2026-03-23-portfolio.md
```

**Design tokens (Tailwind custom theme):**
- `bg`: `#0a0a0a` — page background
- `surface`: `#111111` — card/overlay background
- `accent`: `#00ff88` — electric lime, used sparingly
- `text`: `#f0f0f0` — primary text
- `muted`: `#888888` — secondary/label text
- `border`: `#222222` — subtle dividers

**Fonts:** Syne (800 weight, display headings) + Inter (body) + JetBrains Mono (labels/tags)

---

## Chunk 1: Project Setup

### Task 1: Scaffold Vite + React

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Init Vite project in current directory**

```bash
cd "C:\Users\Fabián Treviño\Desktop\Portafolio"
npm create vite@latest . -- --template react
```
When prompted "Current directory is not empty — continue?" → select **Ignore files and continue**.
Select: **React**, **JavaScript**

- [ ] **Step 2: Install core dependencies**

```bash
npm install
npm install framer-motion
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: `http://localhost:5173` opens, shows default Vite+React page.
Press Ctrl+C to stop.

---

### Task 2: Configure Tailwind with custom design tokens

**Files:**
- Modify: `tailwind.config.js`
- Create: `src/index.css`

- [ ] **Step 1: Replace tailwind.config.js**

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        accent: '#00ff88',
        text: '#f0f0f0',
        muted: '#888888',
        border: '#222222',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Replace src/index.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-bg text-text font-body;
    -webkit-font-smoothing: antialiased;
  }
  ::selection {
    @apply bg-accent text-bg;
  }
}
```

- [ ] **Step 3: Write App.jsx shell**

```jsx
// src/App.jsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 4: Update src/main.jsx to import index.css**

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Create stub components so App.jsx compiles**

Create each file with minimal content (replace in later tasks):

`src/hooks/useInView.js` — empty export stub
`src/components/Navbar.jsx` — `export default function Navbar() { return null }`
`src/components/Hero.jsx` — `export default function Hero() { return null }`
`src/components/About.jsx` — `export default function About() { return null }`
`src/components/Projects.jsx` — `export default function Projects() { return null }`
`src/components/Skills.jsx` — `export default function Skills() { return null }`
`src/components/Contact.jsx` — `export default function Contact() { return null }`

- [ ] **Step 6: Verify app compiles with no errors**

```bash
npm run dev
```
Expected: Page loads as blank black screen (bg-bg applied). No console errors.

---

## Chunk 2: Shared Hook + Navbar

### Task 3: useInView hook

**Files:**
- Create: `src/hooks/useInView.js`

- [ ] **Step 1: Write the hook**

```js
// src/hooks/useInView.js
import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView]. Once the element enters the viewport it stays inView=true
 * (fires once, then disconnects the observer).
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
```

---

### Task 4: Navbar component

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Write Navbar**

```jsx
// src/components/Navbar.jsx
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
        scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-border' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <a
          href="#"
          className="font-display font-bold text-sm tracking-[0.2em] uppercase text-accent hover:opacity-80 transition-opacity"
        >
          FT
        </a>
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
      </div>
    </motion.nav>
  )
}
```

---

## Chunk 3: Hero Section

### Task 5: Hero component

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Write Hero**

```jsx
// src/components/Hero.jsx
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
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
      className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24 pb-16"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={fadeUp}
          className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-6"
        >
          Full-Stack Developer · Monterrey, México
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-[clamp(3rem,10vw,8rem)] text-text leading-[0.95] tracking-tight mb-8"
        >
          Fabián<br />
          Treviño<br />
          <span className="text-accent">Villarreal</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted text-lg md:text-xl max-w-md leading-relaxed mb-10 font-light"
        >
          Building elegant, performant software — from database schema to responsive UI.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="font-mono text-sm font-bold px-7 py-3.5 bg-accent text-bg tracking-wide hover:bg-accent/90 transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="font-mono text-sm px-7 py-3.5 border border-border text-muted hover:border-accent hover:text-accent transition-colors duration-200 tracking-wide"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-6 md:left-auto md:right-10 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}
```

---

## Chunk 4: About Section

### Task 6: About component

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Write About**

```jsx
// src/components/About.jsx
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const STATS = [
  { value: '93/100', label: 'GPA' },
  { value: '3+', label: 'Years Coding' },
  { value: 'BizPro', label: 'Current Role' },
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

        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-8">
              CS student building<br />
              real-world software.
            </h2>
            <p className="text-muted leading-relaxed max-w-xl">
              I'm a Computer Science student at Tecnológico de Monterrey with a focus on
              full-stack development. I design and ship complete systems — clean REST APIs,
              well-structured databases, and responsive frontends — with an emphasis on
              maintainable architecture and developer ergonomics.
            </p>
          </div>

          <div className="flex md:flex-col gap-10 md:gap-12 pt-1">
            {STATS.map(({ value, label }) => (
              <div key={label} className="border-t border-border pt-4 min-w-[100px]">
                <p className="font-display text-3xl font-bold text-text mb-1">{value}</p>
                <p className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

---

## Chunk 5: Projects Section

### Task 7: Projects component

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Write Projects**

```jsx
// src/components/Projects.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const PROJECTS = [
  {
    title: 'ARUX Ticket Management',
    year: '2025',
    description:
      'Full-stack ticket system built solo. REST API with RBAC auth, multi-tenant data isolation, and a responsive React dashboard.',
    tags: ['Node.js', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL', 'React', 'Docker'],
    detail:
      'JWT-based role access control with three permission levels. Containerized with Docker Compose. Dashboard with real-time status updates, filter/sort, and full audit log.',
  },
  {
    title: 'PROYECTO-K Ixpolin',
    year: '2024',
    description:
      'Responsive quiz platform for indigenous language assessment with automated AI report generation.',
    tags: ['React', 'Gemini API', 'JavaScript'],
    detail:
      'Dynamic quiz engine with branching question logic. Integrates Google Gemini to generate structured diagnostic reports automatically. Fully responsive for mobile-first use.',
  },
]

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false)
  const [ref, inView] = useInView()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-border p-8 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default view */}
      <div className="flex justify-between items-start mb-5">
        <h3 className="font-display text-xl font-bold text-text leading-tight">{project.title}</h3>
        <span className="font-mono text-xs text-muted ml-4 shrink-0">{project.year}</span>
      </div>
      <p className="text-muted text-sm leading-relaxed mb-7">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-surface p-8 flex flex-col justify-center pointer-events-none"
      >
        <p className="font-mono text-[10px] text-accent tracking-[0.25em] uppercase mb-4">Details</p>
        <p className="text-text text-sm leading-relaxed">{project.detail}</p>
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
      <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">Projects</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-16">
        Selected work.
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
```

---

## Chunk 6: Skills Section

### Task 8: Skills component

**Files:**
- Modify: `src/components/Skills.jsx`

- [ ] **Step 1: Write Skills**

```jsx
// src/components/Skills.jsx
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Java'],
  },
  {
    category: 'Frameworks & Tools',
    skills: ['Node.js', 'Express', 'React', 'Prisma', 'PostgreSQL', 'Docker', 'Git', 'MySQL'],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section id="skills" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
      <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">Skills</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-16">
        What I work with.
      </h2>

      <div ref={ref} className="space-y-14">
        {SKILL_GROUPS.map(({ category, skills }, groupIdx) => (
          <div key={category}>
            <p className="font-mono text-[10px] text-muted tracking-[0.25em] uppercase mb-5">
              {category}
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: groupIdx * 0.15 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-mono text-sm px-4 py-2 border border-border text-text hover:border-accent hover:text-accent transition-colors duration-200 cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## Chunk 7: Contact Section + Final Polish

### Task 9: Contact component

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Write Contact**

```jsx
// src/components/Contact.jsx
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:fabiantvillarreal@gmail.com',
    display: 'fabiantvillarreal@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/fabian-trevino',
    display: 'linkedin.com/in/fabian-trevino',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/fabian-trevino',
    display: 'github.com/fabian-trevino',
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

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-16 max-w-sm">
          Let's work<br />together.
        </h2>

        <div className="space-y-5 mb-20">
          {LINKS.map(({ label, href, display }) => (
            <div key={label} className="flex items-baseline gap-6 group">
              <span className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase w-16 shrink-0">
                {label}
              </span>
              <a
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className="text-text hover:text-accent transition-colors duration-200 text-sm md:text-base"
              >
                {display}
              </a>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-muted tracking-widest">
          © 2026 Fabián Treviño Villarreal — Monterrey, México
        </p>
      </motion.div>
    </section>
  )
}
```

### Task 10: Final checks

- [ ] **Step 1: Run dev server and visually check all sections**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Dark background, correct fonts loading (Syne for headings, mono for labels)
- Hero text animates in on load with stagger
- Scroll animations trigger for About, Projects, Skills, Contact
- Navbar goes frosted on scroll
- Project cards show hover overlay
- Skill pills have hover state
- Mobile layout (browser devtools, 375px width)

- [ ] **Step 2: Build check**

```bash
npm run build
```
Expected: No errors. `dist/` folder created.

- [ ] **Step 3: Update LinkedIn and GitHub handles in Contact.jsx**

Replace placeholder handles with real URLs once available.

- [ ] **Step 4: Write CLAUDE_LOG.md entry**

See session-logger skill format.
