import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4174'
await mkdir('.cache/previews', { recursive: true })
const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 1605, height: 980 }, deviceScaleFactor: 1 })
  await page.goto(origin)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: '.cache/previews/home-desktop.png', fullPage: false })
  const stylesheet = await page.locator('link[rel="stylesheet"]').getAttribute('href')
  for (const route of ['about', 'resume', 'projects', 'proverbs']) {
    await page.goto(`${origin}/#${route}`)
    await page.evaluate(() => document.fonts.ready)
    await page.locator(`#${route}`).screenshot({ path: `.cache/previews/${route}-desktop.png` })
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(origin)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: '.cache/previews/home-mobile.png', fullPage: false })

  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(`<!doctype html><html lang="en"><head><link rel="stylesheet" href="${new URL(stylesheet, origin).href}" /><style>body{margin:0;width:1200px;height:630px;padding:48px 72px;background:#fff;position:relative;overflow:hidden}.social-top{display:flex;justify-content:space-between;border-bottom:1px solid #e6e9ee;padding-bottom:24px;font-size:17px}.social-heading{font-size:65px;font-weight:600;line-height:1.15;letter-spacing:-3px;margin:118px 0 16px}.social-tagline{font-size:36px;letter-spacing:-1px;color:#737c8a}.social-role{font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#626c7b}.social-note{font-size:15px;color:#626c7b;margin-top:32px;letter-spacing:2px;text-transform:uppercase}.identity-art{position:absolute;right:76px;top:185px;width:210px;height:295px}.monogram{font-size:45px}</style></head><body><div class="social-top"><span>Rinzai Terrado</span><span class="social-role">Python · Data · AI</span></div><div class="social-heading">Rinzai Terrado</div><div class="social-tagline">Making things happen.</div><div class="social-note">Python development · AI applications</div><div class="identity-art"><span class="monogram">RT</span></div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/social-card.png' })
  console.log('Saved desktop and mobile page previews to .cache/previews; social card to public/social-card.png.')
} finally { await browser.close() }
