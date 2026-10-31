import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { siteSections } from '../content'

export default function Header() {
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
