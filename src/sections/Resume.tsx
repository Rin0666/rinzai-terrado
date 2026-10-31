import { education, experience, profile, projects, publication, skillGroups } from '../content'
import { Arrow, Label, SectionHeading } from '../components/ui'

export default function Resume() {
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
