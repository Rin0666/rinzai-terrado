import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { pageMeta, siteSections, legacySections, projects } from '../.cache/prerender/entry-server.mjs'

const homepage = await readFile('dist/index.html', 'utf8')
const origin = homepage.match(/data-site-origin="([^"]*)"/)?.[1]
assert.notEqual(origin, undefined, 'Generated pages must declare their build origin.')
assert.equal((homepage.match(/<h1\b/g) || []).length, 1, 'The one-page portfolio must have one main heading.')
for (const section of siteSections) {
  assert.ok(homepage.includes(`id="${section.id}"`), `Missing section ${section.id}`)
  assert.ok(homepage.includes(`href="#${section.id}"`), `Missing section navigation ${section.id}`)
  assert.ok(homepage.includes(`id="${section.id}-heading"`), `Missing section heading ${section.id}`)
}
for (const project of projects) assert.ok(homepage.includes(`id="project-${project.slug}"`))
assert.ok(!homepage.includes('MiLady') && !homepage.includes('ViralCut'), 'Removed projects must not appear on the site.')
const redirects = await readFile('dist/_redirects', 'utf8')
for (const [route, section] of Object.entries(legacySections)) {
  const html = await readFile(`dist${route}.html`, 'utf8')
  assert.ok(html.includes(`content="0;url=/#${section}"`), `Missing legacy redirect for ${route}`)
  assert.ok(redirects.includes(`${route} /#${section} 301\n`), `Missing hosting redirect for ${route}`)
}
for (const [route, meta] of Object.entries(pageMeta)) {
  const html = await readFile(route === '/' ? 'dist/index.html' : `dist${route}.html`, 'utf8')
  assert.ok(html.includes(meta.title), `Missing page title for ${route}`)
  assert.ok(html.includes('<main'), `Missing HTML content for ${route}`)
  assert.ok(!html.includes('<!--app-html-->'), `Unrendered page at ${route}`)
  if (origin) {
    assert.ok(html.includes(`rel="canonical" href="${new URL(route, origin).href}"`), `Incorrect canonical at ${route}`)
    assert.ok(html.includes(`${origin}/social-card.png`), `Missing social image at ${route}`)
  } else assert.ok(html.includes('content="noindex,follow"'), `Unconfigured builds must be noindex: ${route}`)
}
const notFound = await readFile('dist/404.html', 'utf8')
assert.ok(!notFound.includes('rel="canonical"'))
assert.ok(notFound.includes('content="noindex,follow"'))
assert.equal((await readFile('dist/rinzai-terrado-resume.pdf')).subarray(0, 5).toString(), '%PDF-')
assert.equal((await readFile('dist/social-card.png')).subarray(1, 4).toString(), 'PNG')
if (origin) {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  assert.equal((sitemap.match(/<url>/g) || []).length, Object.keys(pageMeta).length)
}
console.log(`Verified the one-page portfolio, ${siteSections.length} sections, ${Object.keys(legacySections).length} legacy redirects, not-found metadata, resume, and social image${origin ? ', plus production canonical and sitemap' : ''}.`)
