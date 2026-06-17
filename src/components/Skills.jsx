import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiFlask,
  SiPrisma,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiMysql,
} from 'react-icons/si'
import { FaJava, FaDatabase } from 'react-icons/fa'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', Icon: SiPython },
      { name: 'C++', Icon: SiCplusplus },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Java', Icon: FaJava },
      { name: 'SQL', Icon: FaDatabase },
    ],
  },
  {
    category: 'Frameworks & Tools',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express', Icon: SiExpress },
      { name: 'React', Icon: SiReact },
      { name: 'Flask', Icon: SiFlask },
      { name: 'Prisma', Icon: SiPrisma },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'Docker', Icon: SiDocker },
      { name: 'Git', Icon: SiGit },
      { name: 'MySQL', Icon: SiMysql },
    ],
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
            <p className="font-mono text-[10px] text-muted tracking-[0.25em] uppercase mb-6">
              {category}
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map(({ name, Icon }, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: groupIdx * 0.15 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-flex items-center gap-2.5 font-mono text-sm px-4 py-2.5 border border-border text-text hover:border-accent hover:text-accent transition-colors duration-200 cursor-default select-none group"
                >
                  <Icon className="text-muted group-hover:text-accent transition-colors duration-200 shrink-0" size={15} />
                  {name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
