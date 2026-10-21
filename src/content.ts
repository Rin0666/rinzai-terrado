export const profile = {
  name: 'Rinzai Terrado',
  role: 'Python Developer · Data Science',
  email: 'terradorinzai@gmail.com',
  location: 'Las Piñas, Philippines',
  employer: 'Okada Manila',
  employerUrl: 'https://www.okadamanila.com/',
  resumeUrl: '/rinzai-terrado-resume.pdf',
  summary: 'Python developer and data science professional building internal applications, APIs, machine learning workflows, and business automation.',
}

export const experience = {
  company: 'Okada Manila',
  role: 'Python Developer, Data Science',
  period: 'September 2024 — Present',
  responsibilities: [
    'Build and maintain Python applications that support marketing, analytics, and business operations.',
    'Develop APIs and backend services for internal teams and automated workflows.',
    'Deploy machine learning models as reusable tools for analysts and business users.',
    'Automate promotional offer workflows, including award loading and SMS processes through API integrations.',
    'Integrate SQL data sources and design database schemas for applications, reporting, and operational processes.',
    'Develop event-driven workflows, ETL pipelines, and automated reports; clean, validate, and transform data for downstream use.',
    'Write unit tests for applications, APIs, and automation workflows to validate business logic and reduce regressions.',
    'Perform QA and data validation for online game deployments, investigating configuration and calculation discrepancies.',
    'Work with Linux and Cloudera-based environments for data processing and ETL workloads.',
  ],
}

export const skillGroups = [
  { name: 'Development', skills: ['Python', 'SQL', 'REST APIs', 'HTML', 'CSS', 'JavaScript', 'Git', 'Linux'] },
  { name: 'AI & machine learning', skills: ['Machine Learning', 'LLM Applications', 'RAG', 'NLP', 'AI Agents', 'MCP', 'Prompt Engineering'] },
  { name: 'Data & automation', skills: ['ETL', 'Data Validation', 'Cloudera', 'BigQuery', 'Jupyter Notebook', 'Looker Studio', 'Statistics', 'API Integration'] },
]

export const education = {
  school: 'De La Salle University',
  location: 'Manila, Philippines',
  degree: 'BS Computer Science',
  specialization: 'Specialization in Software Technology',
  period: '2019 — 2024',
}

export const publication = {
  title: 'Adding a Temporal Aspect to the Ontology Design of an Ontology Population System for Climate Change and its Impact on Marine Life.',
  venue: '2023 De La Salle University Research Congress Proceedings',
  details: 'Volume 11 · e-ISSN 2449-3309',
}

export type ProjectCategory = 'AI systems' | 'Learning tools' | 'Media tools'
export type Project = {
  slug: string
  number: string
  name: string
  subtitle: string
  category: ProjectCategory
  description: string
  tags: string[]
  overview: string
  focus: string[]
  outcome: string
  diagram: string[]
}

export const projects: Project[] = [
  {
    slug: 'forge-router', number: '01', name: 'ForgeRouter', subtitle: 'A more considered route to AI.', category: 'AI systems',
    description: 'An AI routing prototype exploring how to reduce unnecessary LLM token usage.',
    tags: ['LLM routing', 'Token efficiency'],
    overview: 'ForgeRouter explores routing tasks through an AI workflow with the goal of reducing unnecessary token consumption. The project is a prototype for investigating efficiency across tested tasks.',
    focus: ['Routing tasks in an LLM workflow', 'Reducing unnecessary token consumption', 'Comparing token usage on tested tasks'],
    outcome: 'Roughly 50% lower token consumption was observed on tested tasks. This is a prototype result for those tasks, rather than a general performance guarantee.',
    diagram: ['Task', 'Route', 'Response'],
  },
  {
    slug: 'study-buddy', number: '02', name: 'StudyBuddy', subtitle: 'A little structure for learning.', category: 'Learning tools',
    description: 'An AI study companion for personalized study plans, quizzes, and short lessons.',
    tags: ['AI learning', 'Content generation'],
    overview: 'StudyBuddy is a prototype that uses AI to generate personalized study plans, quizzes, short lessons, and presentation content. It explores how generated material can support a more structured study experience.',
    focus: ['Personalized study-plan generation', 'Quizzes and short lesson content', 'Presentation-content generation'],
    outcome: 'A personal prototype exploring AI-assisted study content, from an initial study plan to quizzes, short lessons, and presentation material.',
    diagram: ['Topic', 'Study plan', 'Practice'],
  },
  {
    slug: 'milady', number: '03', name: 'MiLady', subtitle: 'Exploring the personal AI agent.', category: 'AI systems',
    description: 'A personal agent prototype built with the Hermes Agent ecosystem.',
    tags: ['AI agents', 'Tool use'],
    overview: 'MiLady is a prototype personal AI agent built using the Hermes Agent ecosystem. It provides a place to explore tool-enabled agent workflows and how agents interact with available capabilities.',
    focus: ['Personal AI agent workflows', 'Tool-enabled interactions', 'Exploration of the Hermes Agent ecosystem'],
    outcome: 'A personal prototype used to explore tool-enabled agent workflows in the Hermes Agent ecosystem.',
    diagram: ['Request', 'Agent + tools', 'Action'],
  },
  {
    slug: 'viral-cut', number: '04', name: 'ViralCut', subtitle: 'Finding moments in longer stories.', category: 'Media tools',
    description: 'An AI-assisted prototype for finding candidate clips in YouTube video content.',
    tags: ['Video', 'AI-assisted selection'],
    overview: 'ViralCut explores using AI to identify candidate clips from YouTube video content. The project focuses on discovering portions of longer videos that could be considered for shorter clips.',
    focus: ['Exploring longer-form video content', 'AI-assisted identification of candidate clips', 'Supporting clip selection'],
    outcome: 'A prototype exploring AI-assisted clip discovery and candidate selection from longer video content.',
    diagram: ['Video', 'Identify', 'Candidates'],
  },
]

export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Rinzai Terrado — Python Developer', description: 'Python developer building applications, data workflows, and business automation. Explore my experience and personal AI projects.' },
  '/about': { title: 'About — Rinzai Terrado', description: 'Get to know Rinzai Terrado, a Python developer and data science professional based in the Philippines.' },
  '/resume': { title: 'Resume — Rinzai Terrado', description: 'Professional experience, technical skills, education, and research. View and download Rinzai Terrado’s resume.' },
  '/projects': { title: 'Projects — Rinzai Terrado', description: 'Personal prototypes in AI routing, learning, agents, and video: ForgeRouter, StudyBuddy, MiLady, and ViralCut.' },
  '/contact': { title: 'Contact — Rinzai Terrado', description: 'Get in touch with Rinzai Terrado about Python development, data workflows, and AI applications.' },
  '/proverbs': { title: 'Proverbs — Rinzai Terrado', description: 'Personal reflections and sayings by Rinzai Terrado. The Calmest Waves Flow The Firmest.' },
  ...Object.fromEntries(projects.map(project => [`/projects/${project.slug}`, { title: `${project.name} — Rinzai Terrado`, description: project.description }])),
}

export const notFoundMeta = { title: 'Page not found — Rinzai Terrado', description: 'This page could not be found. Explore Rinzai Terrado’s resume, projects, or contact information.' }
