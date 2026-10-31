import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { commissions, donationMethods, education, experience, interests, legacySections, notFoundMeta, pageMeta, profile, projects, publication, siteSections, skillGroups } from './content'
import type { Project, ProjectCategory } from './content'
import Footer from './components/Footer'

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Label({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function SectionHeading({ id, label, title, children }: { id: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <div className="page-heading"><Label>{label}</Label><h2 id={`${id}-heading`}>{title}</h2>{children && <p className="page-intro">{children}</p>}</div>
}

function PortfolioSection({ id, children }: { id: string; children: ReactNode }) {
  return <section id={id} className="page-section" aria-labelledby={`${id}-heading`} tabIndex={-1}>{children}</section>
}

function SectionNavigation() {
  useEffect(() => {
    let frame = 0
    const jump = (initial = false) => {
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      if (!id) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (!target) return
        if (target instanceof HTMLDetailsElement) target.open = true
        target.scrollIntoView({ block: 'start', behavior: initial ? 'instant' : 'auto' })
        target.focus({ preventScroll: true })
      })
    }
    const onHashChange = () => jump()
    jump(true)
    window.addEventListener('hashchange', onHashChange)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', onHashChange) }
  }, [])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const [active, setActive] = useState('')

  useEffect(() => {
    let frame = 0
    const update = () => {
      const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 73
      let current = ''
      for (const section of siteSections) {
        const target = document.getElementById(section.id)
        if (target && target.getBoundingClientRect().top <= headerBottom + 40) current = section.id
      }
      if (pathname === '/' && window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = 'donate'
      setActive(current)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [pathname])
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

  return <header className="site-header"><div className="header-inner">
    <a href={pathname === "/" ? "#home" : "/#home"} className="brand" aria-label="Rinzai Terrado, home">Rinzai Terrado</a>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><span className={`menu-lines ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span></button>
    <nav id="primary-navigation" ref={navRef} aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`}>
      {siteSections.map(item => <a key={item.id} href={`${pathname === '/' ? '' : '/'}#${item.id}`} onClick={() => setOpen(false)} aria-current={active === item.id ? 'location' : undefined} className={active === item.id ? 'nav-link active' : 'nav-link'}>{item.label}</a>)}
    </nav>
  </div></header>
}

function PageEffects() {
  const { pathname } = useLocation()
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
  }, [pathname])
  return null
}

function Portrait({ eager = false }: { eager?: boolean }) {
  return <div className="identity-art identity-portrait"><img src="/portrait.jpg" alt="Rinzai Terrado" width="3024" height="4032" decoding="async" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} /></div>
}

function ProjectArt({ project }: { project: Project }) {
  return <div className={`project-art art-${project.slug}`} aria-hidden="true">
    <span className="art-index">EXPLORATION {project.number}</span>
    {project.slug === 'forge-router' && <div className="routing-art"><span className="route-input">↗</span><span className="route-connector" /><div className="route-models"><i /><i /><i /></div><span className="route-word">forge<span>router</span></span></div>}
    {project.slug === 'study-buddy' && <div className="study-art"><div className="study-sheet sheet-back" /><div className="study-sheet"><span className="sheet-heading">A little more<br /><em>understanding.</em></span><span className="sheet-rule" /><span className="sheet-rule short" /><span className="sheet-check">✓</span></div><span className="study-spark">✳</span></div>}
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

function Home() {
  return <>
    <section id="home" className="hero" aria-labelledby="home-title" tabIndex={-1}><div className="hero-copy"><h1 id="home-title">Rinzai Terrado</h1><p className="hero-tagline">Making things happen.</p><Label>Python development · AI applications</Label><p className="hero-bio">I build Python applications, APIs, machine learning workflows, and automation at <a href={profile.employerUrl} target="_blank" rel="noreferrer">Okada Manila</a>. My background in marketing analytics informs how I turn data into useful tools, while my personal projects explore AI systems.</p><div className="hero-actions"><a href="#about" className="button button-dark">Learn More</a></div></div><Portrait eager /></section>
  </>
}

function About() {
  return <><SectionHeading id="about" label="A little about me" title={<>Get to Know me.</>}>I’m Rinzai Terrado, a Python developer with a background in data analytics, based in the Philippines.</SectionHeading><section className="about-layout"><Portrait /><div className="prose"><Label>What I do</Label><h3>Connecting ideas<br />to everyday work.</h3><p>At <a href={profile.employerUrl} target="_blank" rel="noreferrer">Okada Manila <span aria-hidden="true">↗</span></a>, I build and maintain internal applications that support marketing, analytics, and business operations.</p><p>My work brings together APIs, SQL data sources, machine learning models, and automated workflows. I help turn data and model outputs into tools that teams can use.</p><p>Outside of work, I prototype LLM routing, AI-powered learning tools, agent workflows, and video analysis. I’m also developing familiarity with retrieval-augmented generation (RAG), MCP, and NLP.</p><a href="#resume" className="text-link">The full resume <Arrow /></a></div></section><section className="section interests-summary" aria-labelledby="interests-heading"><h3 id="interests-heading">Interests</h3><ul className="interests-list">{interests.map(interest => <li key={interest}>{interest}</li>)}</ul></section></>
}

function Resume() {
  return <>
    <div className="resume-heading">
      <SectionHeading id="resume" label="Experience & background" title={<>The work<br /><em>so far.</em></>}>Python development, data analytics, and personal AI/ML explorations.</SectionHeading>
      <a href={profile.resumeUrl} download="rinzai-terrado-resume.pdf" className="button button-outline"><Arrow diagonal />Download resume <span className="button-format">PDF</span></a>
    </div>
    <div className="resume-layout">
      <aside className="resume-sidebar">
        <p className="eyebrow">In this resume</p>
        <a href="#summary">Summary</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#selected-projects">AI projects</a>
        <a href="#education">Education</a>
        <a href="#research">Research</a>
      </aside>
      <div className="resume-content">
        <section id="summary" className="resume-section">
          <h3 className="eyebrow">Professional summary</h3>
          <p className="resume-summary">{profile.summary}</p>
        </section>
        <section id="experience" className="resume-section">
          <Label>Professional experience</Label>
          <h3 className="experience-company">Okada Manila</h3>
          {experience.map(entry => <div className="experience-role" key={entry.role}>
            <div className="resume-entry-heading"><h4>{entry.role}</h4><span>{entry.period}</span></div>
            <ul className="experience-list">{entry.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
          </div>)}
        </section>
        <section id="skills" className="resume-section">
          <h3 className="eyebrow">Skills & tools</h3>
          {skillGroups.map(group => <div key={group.name} className="skill-group"><h4>{group.name}</h4><div className="tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}
        </section>
        <section id="selected-projects" className="resume-section">
          <h3 className="eyebrow">Selected AI projects</h3>
          <div className="resume-project-list">
            {projects.map(project => <div key={project.slug} className="resume-project-entry">
              <a href={`#project-${project.slug}`} className="text-link">{project.name} <Arrow diagonal /></a>
              <p>{project.description} <span className="muted">Prototype</span></p>
            </div>)}
          </div>
        </section>
        <section id="education" className="resume-section">
          <Label>Education</Label>
          <div className="resume-entry-heading"><div><h3>{education.school}</h3><p>{education.degree}</p></div><span>{education.period}</span></div>
          <p>{education.specialization}<br /><span className="muted">{education.location}</span></p>
        </section>
        <section id="research" className="resume-section">
          <Label>Research & publication</Label>
          <h3 className="publication-title">{publication.title}</h3>
          <p>{publication.venue}<br /><span className="muted">{publication.details}</span></p>
        </section>
      </div>
    </div>
  </>
}

function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'All projects'>('All projects')
  const filters: (ProjectCategory | 'All projects')[] = ['All projects', 'AI systems', 'Learning tools']
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

function Proverbs() {
  return <><SectionHeading id="proverbs" label="Personal reflections & sayings" title={<>Wisdom for the<br /><em>Mind and Soul</em></>}>A few words to pause with.</SectionHeading><section className="proverb-feature" aria-label="Personal saying"><span className="quote-mark" aria-hidden="true">“</span><blockquote>The Calmest Waves<br />Flow The <em>Firmest.</em></blockquote><span className="proverb-attribution">· Rinzai Terrado</span><div className="wave-lines" aria-hidden="true"><svg viewBox="0 0 1000 140" fill="none"><path d="M-50 70C100-70 240 200 400 70S700-60 1050 70M-50 90C100-50 240 220 400 90S700-40 1050 90M-50 110C100-30 240 240 400 110S700-20 1050 110" stroke="currentColor" strokeWidth="1" /></svg></div></section><section className="proverb-small"><Label>A little momentum</Label><blockquote>“Heaven Favors the Foolish Monkey in Motion”</blockquote><span>Rinzai Terrado</span></section><section className="proverb-small"><Label>Words to build by</Label><blockquote>“Making things happen.”</blockquote><span>Rinzai Terrado</span></section></>
}

function Commissions() {
  return <>
    <SectionHeading id="commissions" label="Creative commissions" title={<>Small websites.<br /><em>Personal stories.</em></>}>Custom creative websites for the people, moments, and stories that matter to you.</SectionHeading>
    <section className="commission-feature" aria-labelledby="commission-example-title">
      <a className="commission-art" href={commissions.exampleUrl} target="_blank" rel="noreferrer" aria-label="Visit the anniversary website (opens in a new tab)">
        <span className="commission-art-note">A moment, made into a website</span>
        <span className="commission-art-heart" aria-hidden="true">♡</span>
        <span className="commission-art-title" aria-hidden="true">For the memories.<br />For the two of you.</span>
        <span className="commission-art-link">View anniversary website <Arrow diagonal /></span>
      </a>
      <div className="commission-copy prose">
        <Label>Featured creative work</Label>
        <h3 id="commission-example-title">An anniversary,<br />a little differently.</h3>
        <p>A personal website to celebrate a shared story. Explore my anniversary site for an example of the creative work I make.</p>
        <a className="text-link" href={commissions.exampleUrl} target="_blank" rel="noreferrer">Explore the anniversary site <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </section>
    <section className="commission-inquiry" aria-labelledby="commission-inquiry-title">
      <div><Label>Have something in mind?</Label><h3 id="commission-inquiry-title">Let’s make it personal.</h3><p>Tell me about your idea, the occasion, and when you need it. We can talk through the details by email.</p></div>
      <a className="button button-dark" href={commissions.inquiryUrl}>Discuss a commission <Arrow diagonal /></a>
    </section>
  </>
}

function Donate() {
  return <>
    <SectionHeading id="donate" label="Support my work" title={<>A little support.<br /><em>More possibilities.</em></>}>Thank you for supporting my creative work and personal projects.</SectionHeading>
    <section className="donation-grid" aria-label="Donation methods">
      {donationMethods.map(method => <article className="donation-card" key={method.name}>
        <h3>{method.name}</h3>
        <a href={method.qrUrl} target="_blank" rel="noreferrer" aria-label={`Open the full-size ${method.name} donation QR code`}><img className="donation-qr" src={method.qrUrl} alt={`${method.name} donation QR code for Rinzai Terrado`} width={method.width} height={method.height} decoding="async" loading="lazy" /></a>
        <a className="text-link" href={method.qrUrl} download>Save {method.name} QR code <Arrow /></a>
      </article>)}
    </section>
  </>
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
  return <><SectionHeading id="contact" label="Get in touch" title={<>Hey What's Up!<br /><em>Hello</em></>}>Feel Free to Connect or ask anything.</SectionHeading><section className="contact-panel"><div><Label>Drop me a line</Label><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="contact-actions"><a className="button button-dark" href={`mailto:${profile.email}`}>Write an email <Arrow diagonal /></a><button className="button button-outline" onClick={copyEmail}>{copyState === 'copied' ? 'Email copied ✓' : 'Copy email'}</button></div><p role="status" className="copy-status">{copyState === 'copied' ? 'Email address copied to your clipboard.' : copyState === 'error' ? 'Copy is unavailable. Select the email address above, or use the email link.' : '\u00a0'}</p></div><div className="contact-side"><span className="contact-star" aria-hidden="true">✳</span><Label>Based in</Label><p>{profile.location}</p></div></section></>
}

function NotFound() {
  return <section className="not-found"><Label>404 · Page not found</Label><h1>A little<br /><em>off course.</em></h1><p>This page doesn’t seem to be here. Let’s get you back to the work.</p><a href="/" className="button button-dark">Back to home <Arrow /></a></section>
}

function LegacyRedirect({ section }: { section: string }) {
  useEffect(() => { window.location.replace(`/#${section}`) }, [section])
  return <main className="shell not-found"><h1>This page has moved</h1><a className="text-link" href={`/#${section}`}>Continue to the section <Arrow /></a></main>
}

export default function App() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  if (legacySections[path]) return <LegacyRedirect section={legacySections[path]} />
  return <><a className="skip-link" href="#main-content">Skip to content</a><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="shell">
    {path === '/' ? <><Home />
      <PortfolioSection id="about"><About /></PortfolioSection>
      <PortfolioSection id="resume"><Resume /></PortfolioSection>
      <PortfolioSection id="projects"><Projects /></PortfolioSection>
      <PortfolioSection id="commissions"><Commissions /></PortfolioSection>
      <PortfolioSection id="proverbs"><Proverbs /></PortfolioSection>
      <PortfolioSection id="contact"><Contact /></PortfolioSection>
      <PortfolioSection id="donate"><Donate /></PortfolioSection>
      <SectionNavigation />
    </> : <NotFound />}
  </main><Footer /></>
}
