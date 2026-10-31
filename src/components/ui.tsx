import type { ReactNode } from 'react'

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function Spark() {
  return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHeading({ id, label, title, children }: { id: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <div className="page-heading"><Label>{label}</Label><h2 id={`${id}-heading`}>{title}</h2>{children && <p className="page-intro">{children}</p>}</div>
}

export function PortfolioSection({ id, children }: { id: string; children: ReactNode }) {
  return <section id={id} className="page-section" aria-labelledby={`${id}-heading`} tabIndex={-1}>{children}</section>
}
