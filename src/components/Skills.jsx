import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
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

function Chip({ skill, isDragging = false }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 font-mono text-sm px-4 py-2.5 border border-border text-text hover:border-accent hover:text-accent select-none cursor-grab transition-colors duration-150 group"
      style={{
        borderColor: isDragging ? 'rgb(0,255,136)' : undefined,
        color: isDragging ? 'rgb(0,255,136)' : undefined,
        boxShadow: isDragging ? '0 8px 32px rgba(0,255,136,0.15)' : undefined,
      }}
    >
      <skill.Icon
        size={15}
        className={`shrink-0 transition-colors duration-150 ${isDragging ? 'text-accent' : 'text-muted group-hover:text-accent'}`}
      />
      {skill.name}
    </div>
  )
}

function SortableChip({ skill }) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: skill.name })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        opacity: isDragging ? 0 : 1,
        display: 'inline-flex',
      }}
    >
      <Chip skill={skill} />
    </div>
  )
}

function SkillGroup({ category, initialSkills, groupIdx, inView }) {
  const [skills, setSkills] = useState(initialSkills)
  const [activeId, setActiveId] = useState(null)
  const activeSkill = skills.find((s) => s.name === activeId)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function handleDragStart({ active }) {
    setActiveId(active.id)
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    if (over && active.id !== over.id) {
      setSkills((items) => {
        const from = items.findIndex((s) => s.name === active.id)
        const to = items.findIndex((s) => s.name === over.id)
        return arrayMove(items, from, to)
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: groupIdx * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-[10px] text-muted tracking-[0.25em] uppercase mb-6">
        {category}
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={skills.map((s) => s.name)} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SortableChip key={skill.name} skill={skill} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeSkill ? <Chip skill={activeSkill} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section id="skills" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
      <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10">Skills</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight mb-16">
        What I work with.
      </h2>

      <div ref={ref} className="space-y-14">
        {SKILL_GROUPS.map(({ category, skills }, i) => (
          <SkillGroup
            key={category}
            category={category}
            initialSkills={skills}
            groupIdx={i}
            inView={inView}
          />
        ))}
      </div>
    </section>
  )
}
