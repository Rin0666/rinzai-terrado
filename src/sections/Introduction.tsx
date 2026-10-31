import { interests, profile } from '../content'
import { Arrow, Label } from '../components/ui'

function Portrait() {
  return <div className="identity-art identity-portrait">
    <img src="/portrait.jpg" alt="Rinzai Terrado" width="3024" height="4032" decoding="async" fetchPriority="high" />
  </div>
}

export default function Introduction() {
  return <section id="about" className="introduction" aria-labelledby="about-heading" tabIndex={-1}>
    <div id="home" className="hero" tabIndex={-1}>
      <div className="hero-heading">
        <h1 id="about-heading">Rinzai Terrado</h1>
        <p className="hero-tagline">Making things happen.</p>
        <Label>Python development · AI applications</Label>
      </div>
      <Portrait />
      <div className="hero-copy">
        <p className="hero-bio">I’m a Python developer with a background in data analytics, based in the Philippines. At <a href={profile.employerUrl} target="_blank" rel="noreferrer">Okada Manila</a>, I build Python applications, APIs, machine learning workflows, and business automation.</p>
        <p className="hero-bio">My work connects APIs, SQL data sources, and machine learning models to turn data into useful tools. My experience in marketing analytics informs how I approach business operations and reporting.</p>
        <p className="hero-bio">Outside of work, I prototype AI systems and learning tools, while developing my familiarity with RAG, MCP, and NLP.</p>
        <a href="#resume" className="text-link">The full resume <Arrow /></a>
      </div>
    </div>
    <section className="interests-summary" aria-labelledby="interests-heading">
      <h2 id="interests-heading">Interests</h2>
      <ul className="interests-list">{interests.map(interest => <li key={interest}>{interest}</li>)}</ul>
    </section>
  </section>
}
