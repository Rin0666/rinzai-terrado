import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { pageMeta, notFoundMeta } from '../content'

export default function DocumentMetadata() {
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
