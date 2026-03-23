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
      'JWT-based role access control with three permission levels — admin, agent, and client. Containerized with Docker Compose for one-command deployment. Dashboard surfaces real-time status, filter & sort, and a full audit log per ticket.',
  },
  {
    title: 'PROYECTO-K Ixpolin',
    year: '2024',
    description:
      'Interactive learning platform with quizzes covering basic math, Spanish, and more — powered by the Gemini API for dynamic content and report generation.',
    tags: ['React', 'Gemini API', 'JavaScript'],
    detail:
      'Quiz engine with multiple subject areas (math, Spanish, and more). Integrates Google Gemini to generate personalized learning reports automatically. Fully responsive layout built for students of all ages.',
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
      className="relative border border-border p-8 overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default state */}
      <header className="flex justify-between items-start mb-5">
        <h3 className="font-display text-xl font-bold text-text leading-tight">{project.title}</h3>
        <span className="font-mono text-xs text-muted ml-4 shrink-0">{project.year}</span>
      </header>

      <p className="text-muted text-sm leading-relaxed mb-7">{project.description}</p>

      <footer className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted"
          >
            {tag}
          </span>
        ))}
      </footer>

      {/* Hover reveal overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="absolute inset-0 bg-surface p-8 flex flex-col justify-center pointer-events-none"
      >
        <p className="font-mono text-[10px] text-accent tracking-[0.25em] uppercase mb-5">
          Details
        </p>
        <p className="text-text text-sm leading-[1.8]">{project.detail}</p>
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
          <ProjectCard key={project.title} project={project} delay={i * 0.12} />
        ))}
      </div>
    </section>
  )
}
