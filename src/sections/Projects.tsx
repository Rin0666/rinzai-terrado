import { useEffect, useState } from 'react'
import { projects } from '../content'
import type { Project, ProjectCategory } from '../content'
import { Arrow, SectionHeading, Spark } from '../components/ui'

function ProjectArt({ project }: { project: Project }) {
  return <div className={`project-art art-${project.slug}`} aria-hidden="true">
    <span className="art-index">EXPLORATION {project.number}</span>
    {project.slug === 'forge-router' && <div className="routing-art"><span className="route-input"><Arrow diagonal /></span><span className="route-connector" /><div className="route-models"><i /><i /><i /></div><span className="route-word">forge<span>router</span></span></div>}
    {project.slug === 'study-buddy' && <div className="study-art"><div className="study-sheet sheet-back" /><div className="study-sheet"><span className="sheet-heading">A little more<br /><em>understanding.</em></span><span className="sheet-rule" /><span className="sheet-rule short" /><span className="sheet-check">✓</span></div><span className="study-spark"><Spark /></span></div>}
    <span className="art-footnote">Concept illustration · Personal prototype</span>
  </div>
}

function ProjectCard({ project, hidden }: { project: Project; hidden: boolean }) {
  return <details id={`project-${project.slug}`} className="project-card" hidden={hidden} tabIndex={-1}>
    <summary className="project-card-link">
      <ProjectArt project={project} />
      <div className="project-card-heading"><h3>{project.name}</h3><span className="project-card-arrow" aria-hidden="true">+</span></div>
      <p>{project.description}</p>
      <div className="project-meta"><span>{project.category}</span><span>Prototype</span></div>
      <span className="project-note-toggle">Project notes <span aria-hidden="true">↕</span></span>
    </summary>
    <div className="project-notes prose">
      <p className="project-subtitle">{project.subtitle}</p>
      <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <h4>The idea</h4><p>{project.overview}</p>
      <h4>What it explores</h4><ul>{project.focus.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="concept-flow" aria-label="Conceptual workflow">{project.diagram.map(step => <div key={step}>{step}</div>)}</div>
      <p className="diagram-caption">A conceptual view of the project’s focus.</p>
      <h4>Current outcome</h4><p>{project.outcome}</p>
    </div>
  </details>
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'All projects'>('All projects')
  const filters: (ProjectCategory | 'All projects')[] = ['All projects', ...new Set(projects.map(project => project.category))]
  const count = filter === 'All projects' ? projects.length : projects.filter(project => project.category === filter).length
  useEffect(() => {
    const showLinkedProject = () => {
      if (window.location.hash.startsWith('#project-')) setFilter('All projects')
    }
    window.addEventListener('hashchange', showLinkedProject)
    return () => window.removeEventListener('hashchange', showLinkedProject)
  }, [])
  return <><SectionHeading id="projects" label="Projects & experiments" title={<>A few things<br /><em>I’ve been building.</em></>}>Personal prototypes exploring AI, learning, and the possibilities between an idea and a useful tool.</SectionHeading><div className="project-filters" role="group" aria-label="Filter projects by category">{filters.map(item => <button key={item} className={filter === item ? 'filter-button selected' : 'filter-button'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === 'All projects' ? projects.length : projects.filter(project => project.category === item).length}</span></button>)}</div><p className="sr-only" role="status">Showing {count} {count === 1 ? 'project' : 'projects'}</p><div className="project-grid projects-page-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} hidden={filter !== 'All projects' && project.category !== filter} />)}</div></>
}
