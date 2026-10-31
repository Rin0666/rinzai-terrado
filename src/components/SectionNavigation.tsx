import { useEffect } from 'react'

export default function SectionNavigation() {
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
