export const profile = {
  name: 'Rinzai Terrado',
  role: 'Python Developer · Data Science · AI/ML Applications',
  email: 'terradorinzai@gmail.com',
  instagramUrl: 'https://www.instagram.com/rinzai._/',
  location: 'Las Piñas, Philippines',
  employer: 'Okada Manila',
  employerUrl: 'https://www.okadamanila.com/',
  resumeUrl: '/rinzai-terrado-resume.pdf',
  summary: 'Python developer and data analytics professional experienced in building internal applications, REST APIs, SQL-based data pipelines, and machine learning workflows. I build automation and reporting tools for enterprise operations and explore LLM applications, model routing, and AI agents through personal projects.',
}

export const experience = [
  {
    company: 'Okada Manila',
    role: 'Python Developer, Data Science',
    period: 'Apr 2026 — Present',
    responsibilities: [
      'Build and maintain Python applications, REST APIs, and backend services supporting marketing operations, analytics, and internal reporting.',
      'Integrate SQL databases and internal APIs to automate promotional reward loading, SMS communication workflows, and operational processes.',
      'Deploy regression and time-series machine learning workflows as reusable tools for analysts and business users.',
      'Develop event-driven automation, ETL processes, and reporting jobs; clean, transform, and validate data from enterprise systems.',
      'Apply unit testing, SQL schema design, and debugging to improve the reliability of applications and automation workflows.',
      'Support Docker, Linux, and Cloudera-based environments, and investigate configuration and calculation discrepancies during game-deployment QA.',
    ],
  },
  {
    company: 'Okada Manila',
    role: 'Data Analyst, Strategic Marketing',
    period: 'Sep 2024 — Apr 2026',
    responsibilities: [
      'Analyzed casino marketing campaigns through player engagement, redemption activity, ROI, theoretical win, and incremental revenue against baseline performance.',
      'Examined player frequency, spending patterns, and customer value to inform segmentation, offer targeting, and promotional reward allocation.',
      'Extracted, cleaned, reconciled, and validated enterprise data with SQL to deliver consistent reporting and trustworthy analysis.',
      'Evaluated promotional budgets, reward structures, and projected gaming activity to support campaign cost and revenue assessments.',
      'Produced performance reports and worked with marketing stakeholders on KPI definitions, analytical requirements, and campaign improvements.',
    ],
  },
]

export const skillGroups = [
  { name: 'Languages & development', skills: ['Python', 'SQL', 'JavaScript', 'HTML', 'CSS', 'REST APIs'] },
  { name: 'Data & machine learning', skills: ['ETL', 'Data validation', 'Statistical analysis', 'Regression', 'Time-series modeling', 'Business intelligence'] },
  { name: 'AI & LLMs (personal projects)', skills: ['LLM applications', 'Prompt engineering', 'Model routing', 'AI agents', 'Tool calling', 'RAG (familiarity)', 'MCP (familiarity)', 'NLP (familiarity)'] },
  { name: 'Platforms & tools', skills: ['Git', 'Docker', 'Linux', 'Cloudera', 'Hive / Impala', 'BigQuery', 'Jupyter Notebook', 'Looker Studio'] },
  { name: 'Professional', skills: ['Stakeholder collaboration', 'Requirements analysis', 'Analytical problem-solving'] },
]

export const interests = ['YuGiOh', 'Fishing', 'Schemes']

export const commissions = {
  exampleUrl: 'https://3rdanniversary.rinzaiterrado.com/',
  inquiryUrl: `mailto:${profile.email}?subject=${encodeURIComponent('Creative website commission')}`,
}

export const donationMethods = [
  { name: 'MariBank', qrUrl: '/maribank-qr.png', width: 710, height: 784 },
  { name: 'GCash', qrUrl: '/gcash-qr.png', width: 912, height: 1055 },
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

export type ProjectCategory = 'AI systems' | 'Learning tools'
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
    description: 'An LLM routing prototype exploring task-based model selection and inference efficiency.',
    tags: ['LLM routing', 'Token efficiency'],
    overview: 'ForgeRouter is an LLM routing prototype exploring task-based model selection and inference efficiency, with token usage measured on tested tasks.',
    focus: ['Task-based model selection', 'Inference and token efficiency', 'Comparing token consumption across tested tasks'],
    outcome: 'Roughly 50% lower token consumption was observed on tested tasks. This is a prototype result for those tasks, rather than a general performance guarantee.',
    diagram: ['Task', 'Route', 'Response'],
  },
  {
    slug: 'study-buddy', number: '02', name: 'StudyBuddy', subtitle: 'A little structure for learning.', category: 'Learning tools',
    description: 'An AI learning prototype generating personalized study plans, quizzes, lessons, and presentation content.',
    tags: ['AI learning', 'Content generation'],
    overview: 'StudyBuddy uses LLM integration and prompt-driven structured outputs to generate personalized study plans, quizzes, short lessons, and presentation content.',
    focus: ['LLM integration', 'Prompt-driven structured outputs', 'Study plans, quizzes, lessons, and presentation content'],
    outcome: 'A personal prototype exploring AI-assisted study content, from an initial study plan to quizzes, short lessons, and presentation material.',
    diagram: ['Topic', 'Study plan', 'Practice'],
  },
]

export const siteSections = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'commissions', label: 'Commissions' },
  { id: 'proverbs', label: 'Proverbs' },
  { id: 'contact', label: 'Contact' },
  { id: 'donate', label: 'Donate' },
]

export const legacySections: Record<string, string> = {
  '/projects/milady': 'projects',
  '/projects/viral-cut': 'projects',
  ...Object.fromEntries(siteSections.map(section => [`/${section.id}`, section.id])),
  ...Object.fromEntries(projects.map(project => [`/projects/${project.slug}`, `project-${project.slug}`])),
}

export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Rinzai Terrado — Python Developer', description: 'Python developer and former data analyst building REST APIs, data pipelines, machine learning workflows, and personal AI prototypes. Explore my experience, projects, and creative commissions.' },
}

export const notFoundMeta = { title: 'Page not found — Rinzai Terrado', description: 'This page could not be found. Explore Rinzai Terrado’s resume, projects, or contact information.' }
