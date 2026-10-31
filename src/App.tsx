import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { legacySections } from './content'
import { Arrow, Label, PortfolioSection } from './components/ui'
import Header from './components/Header'
import DocumentMetadata from './components/DocumentMetadata'
import SectionNavigation from './components/SectionNavigation'
import Footer from './components/Footer'
import Introduction from './sections/Introduction'
import Resume from './sections/Resume'
import Projects from './sections/Projects'
import Commissions from './sections/Commissions'
import Proverbs from './sections/Proverbs'
import Contact from './sections/Contact'
import Donate from './sections/Donate'

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
  return <><a className="skip-link" href="#main-content">Skip to content</a><DocumentMetadata /><Header /><main id="main-content" tabIndex={-1} className="shell">
    {path === '/' ? <><Introduction />
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
