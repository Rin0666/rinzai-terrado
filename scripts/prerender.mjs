import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, loadEnv } from 'vite'

const root = process.cwd()
const output = path.join(root, 'dist')
const template = await readFile(path.join(output, 'index.html'), 'utf8')
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const env = { ...loadEnv('production', root, ''), ...process.env }
let origin
if (env.SITE_URL?.trim()) {
  const url = new URL(env.SITE_URL.trim())
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTPS origin without a path, query, credentials, or fragment.')
  }
  origin = url.origin
}

await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.cache/prerender',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
})

const { render, pageMeta, notFoundMeta } = await import(pathToFileURL(path.join(root, '.cache/prerender/entry-server.mjs')).href)
const routes = [...Object.keys(pageMeta), '/404']

for (const route of routes) {
  const meta = pageMeta[route] ?? notFoundMeta
  const canonical = origin && pageMeta[route] ? new URL(route, origin).href : null
  const head = [
    `<meta name="robots" content="${origin && pageMeta[route] ? 'index,follow' : 'noindex,follow'}" />`,
    canonical ? `<link rel="canonical" href="${escape(canonical)}" />\n<meta property="og:url" content="${escape(canonical)}" />` : '',
    origin ? `<meta property="og:image" content="${escape(origin)}/social-card.png" />\n<meta property="og:image:alt" content="Rinzai Terrado — Python developer, data, and AI applications" />` : '',
  ].filter(Boolean).join('\n    ')
  const html = template
    .replace(/<html([^>]*)>/, `<html$1 data-site-origin="${escape(origin ?? '')}">`)
    .replace('<div id="root">', `<div id="root" data-rendered-path="${escape(route)}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(meta.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(meta.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(meta.description)}`)
    .replace('<!--page-head-->', head)
    .replace('<!--app-html-->', render(route))
  const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  const destination = path.join(output, filename)
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, html)
}

await writeFile(path.join(output, 'robots.txt'), origin ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n')
if (origin) {
  const urls = Object.keys(pageMeta).map(route => `<url><loc>${escape(new URL(route, origin).href)}</loc></url>`).join('\n')
  await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
}
console.log(`Generated ${routes.length} HTML pages. ${origin ? `Production origin: ${origin}` : 'SITE_URL is unset: indexing is disabled and domain-specific metadata is omitted.'}`)
