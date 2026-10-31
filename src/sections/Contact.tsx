import { useEffect, useState } from 'react'
import { profile } from '../content'
import { Arrow, Label, SectionHeading, Spark } from '../components/ui'

export default function Contact() {
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
  return <><SectionHeading id="contact" label="Get in touch" title={<>Hey What's Up!<br /><em>Hello</em></>}>Feel Free to Connect or ask anything.</SectionHeading><section className="contact-panel"><div><Label>Drop me a line</Label><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="contact-actions"><a className="button button-dark" href={`mailto:${profile.email}`}>Write an email <Arrow diagonal /></a><button className="button button-outline" onClick={copyEmail}>{copyState === 'copied' ? 'Email copied ✓' : 'Copy email'}</button></div><p role="status" className="copy-status">{copyState === 'copied' ? 'Email address copied to your clipboard.' : copyState === 'error' ? 'Copy is unavailable. Select the email address above, or use the email link.' : '\u00a0'}</p></div><div className="contact-side"><span className="contact-star" aria-hidden="true"><Spark /></span><Label>Based in</Label><p>{profile.location}</p></div></section></>
}
