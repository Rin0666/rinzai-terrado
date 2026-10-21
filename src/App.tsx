import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router'
import { education, experience, notFoundMeta, pageMeta, profile, projects, publication, skillGroups } from './content'
import type { Project, ProjectCategory } from './content'

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function DownloadIcon() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Label({ children, number }: { children: ReactNode; number?: string }) {
  return <p className="eyebrow">{number && <span className="section-number">{number}</span>}{children}</p>
}

function PageHeading({ number, label, title, children }: { number: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <div className="page-heading"><Label number={number}>{label}</Label><h1>{title}</h1>{children && <p className="page-intro">{children}</p>}</div>
}

const navigation = [
  { path: '/about', label: 'About' },
  { path: '/resume', label: 'Resume' },
  { path: '/projects', label: 'Projects' },
  { path: '/proverbs', label: 'Proverbs' },
  { path: '/contact', label: 'Contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node) && !menuButton.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', outside) }
  }, [open])

  return <header className="site-header shell">
    <Link to="/" className="brand" aria-label="Rinzai Terrado, home"><span className="brand-mark" aria-hidden="true">rt.</span><span>Rinzai Terrado<span className="brand-caption">Developer & builder</span></span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><span className={`menu-lines ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span></button>
    <nav id="primary-navigation" ref={navRef} aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`}>
      {navigation.map(item => <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}{item.path === '/contact' && <Arrow diagonal />}</NavLink>)}
    </nav>
  </header>
}

function Footer() {
  return <footer className="site-footer shell"><Link to="/" className="footer-name">Rinzai Terrado<span>Making things happen.</span></Link><p>Based in the Philippines.<br /><span>© 2026 Rinzai Terrado</span></p><a className="text-link" href={`mailto:${profile.email}`}>Say hello <Arrow diagonal /></a></footer>
}

function PageEffects() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  useEffect(() => {
    const normalized = pathname.replace(/\/$/, '') || '/'
    const meta = pageMeta[normalized] ?? notFoundMeta
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    const origin = document.documentElement.dataset.siteOrigin
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (origin && pageMeta[normalized]) {
      const url = new URL(normalized, origin).href
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
      canonical.href = url
      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
      if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.append(ogUrl) }
      ogUrl.content = url
    } else {
      canonical?.remove()
      document.querySelector('meta[property="og:url"]')?.remove()
    }
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.append(robots) }
    robots.content = origin && pageMeta[normalized] ? 'index,follow' : 'noindex,follow'
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])
  return null
}

function Monogram() {
  return <div className="identity-art" role="img" aria-label="RT monogram, Python, data, and AI">
    <div className="identity-top"><span>PERSONAL PORTFOLIO</span><span>RT / 01</span></div>
    <div className="identity-center"><span className="identity-orbit orbit-one" /><span className="identity-orbit orbit-two" /><span className="monogram">rt<span>.</span></span><span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span></div>
    <div className="identity-bottom"><span>Curiosity.<br />Made practical.</span><span className="identity-disc" aria-hidden="true"><Arrow diagonal /></span></div>
    <div className="identity-strip"><span>PYTHON</span><span>DATA</span><span>AI</span></div>
  </div>
}

function ProjectArt({ project }: { project: Project }) {
  return <div className={`project-art art-${project.slug}`} aria-hidden="true">
    <span className="art-index">EXPLORATION {project.number}</span>
    {project.slug === 'forge-router' && <div className="routing-art"><span className="route-input">↗</span><span className="route-connector" /><div className="route-models"><i /><i /><i /></div><span className="route-word">forge<span>router</span></span></div>}
    {project.slug === 'study-buddy' && <div className="study-art"><div className="study-sheet sheet-back" /><div className="study-sheet"><span className="sheet-heading">A little more<br /><em>understanding.</em></span><span className="sheet-rule" /><span className="sheet-rule short" /><span className="sheet-check">✓</span></div><span className="study-spark">✳</span></div>}
    {project.slug === 'milady' && <div className="agent-art"><span className="agent-orbit" /><span className="agent-core">m.</span><i /><i /><i /><span className="agent-word">a little assistance.</span></div>}
    {project.slug === 'viral-cut' && <div className="video-art"><div className="video-frame"><span>▶</span></div><div className="video-timeline">{Array.from({ length: 25 }, (_, i) => <i key={i} />)}<span className="video-selection" /></div></div>}
    <span className="art-footnote">Concept illustration · Personal prototype</span>
  </div>
}

function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><Link to={`/projects/${project.slug}`} className="project-card-link"><ProjectArt project={project} /><div className="project-card-heading"><h3>{project.name}</h3><span className="project-card-arrow"><Arrow diagonal /></span></div><p>{project.description}</p><div className="project-meta"><span>{project.category}</span><span>Prototype</span></div></Link></article>
}

function ContactCallout() {
  return <section className="contact-callout"><div><Label>Have something in mind?</Label><h2>Let’s make it <em>happen.</em></h2></div><Link to="/contact" className="circle-link" aria-label="Get in touch"><Arrow diagonal /></Link></section>
}

function Home() {
  return <>
    <section className="hero"><div className="hero-copy"><Label><span className="status-dot" />Python developer · AI applications</Label><h1>Making things<br /><em>happen.</em></h1><p className="hero-description">I’m Rinzai, a developer turning data and ideas into useful applications.</p><p className="hero-bio">Currently building Python applications and automation at <a href={profile.employerUrl} target="_blank" rel="noreferrer">Okada Manila <span aria-hidden="true">↗</span></a>. Exploring what’s possible with AI along the way.</p><div className="hero-actions"><Link to="/projects" className="button button-dark">Explore my work <Arrow diagonal /></Link><Link to="/about" className="text-link">A little about me <Arrow /></Link></div></div><Monogram /></section>
    <div className="intro-strip"><span>Based in the Philippines</span><span className="strip-line" /><span>Applications. Data. Thoughtful automation.</span><a href="#selected-work" className="scroll-cue">Scroll to explore <span aria-hidden="true">↓</span></a></div>
    <section id="selected-work" className="section"><div className="section-heading"><div><Label number="01">Selected work</Label><h2>Ideas put <em>into practice.</em></h2></div><Link to="/projects" className="text-link">All projects <Arrow /></Link></div><div className="project-grid">{projects.slice(0, 2).map(project => <ProjectCard key={project.slug} project={project} />)}</div></section>
    <section className="home-about section"><Label number="02">Behind the work</Label><div><h2>A developer with<br />a curious <em>mind.</em></h2><p>I work across applications, data, and automation — connecting systems, simplifying workflows, and making information useful.</p><p>Outside my professional work, I explore LLM applications, AI agents, and tools that help people learn and create.</p><Link to="/resume" className="text-link">View my experience <Arrow /></Link></div><div className="expertise-list">{['Python development', 'Data & automation', 'AI applications'].map((item, index) => <div key={item}><span>0{index + 1}</span><h3>{item}</h3><Arrow diagonal /></div>)}</div></section>
    <ContactCallout />
  </>
}

function About() {
  return <><PageHeading number="01" label="A little about me" title={<>Curiosity, with<br /><em>a practical side.</em></>}>I’m Rinzai Terrado, a Python developer and data science professional based in the Philippines.</PageHeading><section className="about-layout"><Monogram /><div className="prose"><Label>What I do</Label><h2>Connecting ideas<br />to everyday work.</h2><p>At <a href={profile.employerUrl} target="_blank" rel="noreferrer">Okada Manila <span aria-hidden="true">↗</span></a>, I build and maintain internal applications that support marketing, analytics, and business operations.</p><p>My work brings together APIs, SQL data sources, machine learning models, and automated workflows. I help turn data and model outputs into tools that teams can use.</p><p>My personal projects explore another part of that curiosity: LLM applications, retrieval-augmented generation, natural language processing, and tool-enabled AI agents.</p><Link to="/resume" className="text-link">The full resume <Arrow /></Link></div></section><section className="section education-summary"><Label number="02">Foundations</Label><div><h2>{education.school}</h2><p>{education.degree}<br />{education.specialization}</p></div><span className="muted">{education.period}<br />{education.location}</span></section><ContactCallout /></>
}

function Resume() {
  return <><div className="resume-heading"><PageHeading number="02" label="Experience & background" title={<>The work<br /><em>so far.</em></>}>Python development, data science, and a growing collection of things built and learned.</PageHeading><a href={profile.resumeUrl} download className="button button-outline"><DownloadIcon />Download resume <span className="button-format">PDF</span></a></div><div className="resume-layout"><aside className="resume-sidebar"><p className="eyebrow">On this page</p><a href="#experience">Experience <span>01</span></a><a href="#skills">Skills <span>02</span></a><a href="#education">Education <span>03</span></a><a href="#research">Research <span>04</span></a><button className="text-link print-link" onClick={() => window.print()}>Print this page <Arrow diagonal /></button></aside><div className="resume-content">
      <section id="experience" className="resume-section"><Label number="01">Experience</Label><div className="resume-entry-heading"><div><h2>{experience.company}</h2><p>{experience.role}</p></div><span>{experience.period}</span></div><ul className="experience-list">{experience.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section id="skills" className="resume-section"><Label number="02">Skills & tools</Label>{skillGroups.map(group => <div key={group.name} className="skill-group"><h3>{group.name}</h3><div className="tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</section>
      <section id="education" className="resume-section"><Label number="03">Education</Label><div className="resume-entry-heading"><div><h2>{education.school}</h2><p>{education.degree}</p></div><span>{education.period}</span></div><p>{education.specialization}<br /><span className="muted">{education.location}</span></p></section>
      <section id="research" className="resume-section"><Label number="04">Research & publication</Label><h2 className="publication-title">{publication.title}</h2><p>{publication.venue}<br /><span className="muted">{publication.details}</span></p></section>
    </div></div><ContactCallout /></>
}

function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'All projects'>('All projects')
  const filters: (ProjectCategory | 'All projects')[] = ['All projects', 'AI systems', 'Learning tools', 'Media tools']
  const filteredProjects = filter === 'All projects' ? projects : projects.filter(project => project.category === filter)
  return <><PageHeading number="03" label="Projects & experiments" title={<>A few things<br /><em>I’ve been building.</em></>}>Personal prototypes exploring AI, learning, and the possibilities between an idea and a useful tool.</PageHeading><div className="project-filters" role="group" aria-label="Filter projects by category">{filters.map(item => <button key={item} className={filter === item ? 'filter-button selected' : 'filter-button'} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === 'All projects' ? projects.length : projects.filter(project => project.category === item).length}</span></button>)}</div><p className="sr-only" role="status">Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</p><div className="project-grid projects-page-grid">{filteredProjects.map(project => <ProjectCard key={project.slug} project={project} />)}</div><ContactCallout /></>
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  if (!project) return <NotFound />
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return <><Link className="text-link back-link" to="/projects"><span aria-hidden="true">←</span> All projects</Link><div className="project-detail-heading"><div><Label number={project.number}>{project.category} · Personal prototype</Label><h1>{project.name}</h1><p>{project.subtitle}</p></div><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="detail-art"><ProjectArt project={project} /></div><div className="project-story"><aside><Label>Project notes</Label><dl><dt>Type</dt><dd>Personal project</dd><dt>Status</dt><dd>Prototype</dd><dt>Focus</dt><dd>{project.category}</dd></dl></aside><div className="prose"><section><h2>The idea</h2><p>{project.overview}</p></section><section><h2>What it explores</h2><ul>{project.focus.map(item => <li key={item}>{item}</li>)}</ul><div className="concept-flow" aria-label="Conceptual workflow">{project.diagram.map((step, index) => <div key={step}><span className="eyebrow">0{index + 1}</span><span>{step}</span>{index < 2 && <Arrow />}</div>)}</div><p className="diagram-caption">A conceptual view of the project’s focus.</p></section><section><h2>Current outcome</h2><p>{project.outcome}</p></section></div></div><Link to={`/projects/${next.slug}`} className="next-project"><div><Label>Next exploration</Label><h2>{next.name}</h2></div><Arrow diagonal /></Link></>
}

function Proverbs() {
  return <><PageHeading number="04" label="Personal reflections & sayings" title={<>A moment<br /><em>to reflect.</em></>}>A few words to pause with.</PageHeading><section className="proverb-feature" aria-label="Personal saying"><span className="quote-mark" aria-hidden="true">“</span><blockquote>The Calmest Waves<br />Flow The <em>Firmest.</em></blockquote><span className="proverb-attribution">A personal saying · Rinzai Terrado</span><div className="wave-lines" aria-hidden="true"><svg viewBox="0 0 1000 140" fill="none"><path d="M-50 70C100-70 240 200 400 70S700-60 1050 70M-50 90C100-50 240 220 400 90S700-40 1050 90M-50 110C100-30 240 240 400 110S700-20 1050 110" stroke="currentColor" strokeWidth="1" /></svg></div></section><section className="proverb-small"><Label>Words to build by</Label><blockquote>“Making things happen.”</blockquote><span>Rinzai Terrado</span></section><ContactCallout /></>
}

function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  useEffect(() => {
    if (copyState === 'idle') return
    const timer = setTimeout(() => setCopyState('idle'), 4000)
    return () => clearTimeout(timer)
  }, [copyState])
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyState('copied') }
    catch { setCopyState('error') }
  }
  return <><PageHeading number="05" label="Get in touch" title={<>Good things start<br /><em>with a hello.</em></>}>Have a project in mind, a question about my work, or an idea worth exploring? I’d be happy to hear from you.</PageHeading><section className="contact-panel"><div><Label>Drop me a line</Label><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><p>For conversations about Python, data, AI applications,<br className="desktop-break" /> and useful things we could build.</p><div className="contact-actions"><a className="button button-dark" href={`mailto:${profile.email}`}>Write an email <Arrow diagonal /></a><button className="button button-outline" onClick={copyEmail}>{copyState === 'copied' ? 'Email copied ✓' : 'Copy email'}</button></div><p role="status" className="copy-status">{copyState === 'copied' ? 'Email address copied to your clipboard.' : copyState === 'error' ? 'Copy is unavailable. Select the email address above, or use the email link.' : '\u00a0'}</p></div><div className="contact-side"><span className="contact-star" aria-hidden="true">✳</span><Label>Based in</Label><p>{profile.location}</p><span className="muted">Open to a good conversation.</span></div></section><div className="contact-bottom"><p>Prefer to start with the background?</p><Link to="/resume" className="text-link">View my resume <Arrow /></Link></div></>
}

function NotFound() {
  return <section className="not-found"><Label>404 · Page not found</Label><h1>A little<br /><em>off course.</em></h1><p>This page doesn’t seem to be here. Let’s get you back to the work.</p><Link to="/" className="button button-dark">Back to home <Arrow /></Link></section>
}

export default function App() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="shell"><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/resume" element={<Resume />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} /><Route path="/proverbs" element={<Proverbs />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>
}
