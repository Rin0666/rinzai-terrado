import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4174'
await mkdir('.cache/previews', { recursive: true })
const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 })
  await page.goto(origin)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: '.cache/previews/home-desktop.png', fullPage: true })
  const stylesheet = await page.locator('link[rel="stylesheet"]').getAttribute('href')
  await page.goto(`${origin}/proverbs`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: '.cache/previews/proverbs-desktop.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(origin)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: '.cache/previews/home-mobile.png', fullPage: true })

  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(`<!doctype html><html lang="en"><head><link rel="stylesheet" href="${new URL(stylesheet, origin).href}" /><style>body{margin:0;width:1200px;height:630px;padding:65px 75px;background:#f8f7f4;position:relative;overflow:hidden}.social-top{display:flex;justify-content:space-between;border-bottom:1px solid #d9dad1;padding-bottom:25px;font-size:17px}.social-heading{font-family:'Instrument Serif',serif;font-size:112px;line-height:1.03;letter-spacing:-3px;margin:40px 0 25px}.social-heading em{color:#566145}.social-note{font-size:20px;color:#686b60}.social-mark{position:absolute;right:75px;top:190px;width:230px;height:230px;background:#e7e9df;display:grid;place-content:center;font:155px 'Instrument Serif',serif;letter-spacing:-12px;padding-right:20px}.social-role{font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#566145}</style></head><body><div class="social-top"><strong>Rinzai Terrado</strong><span class="social-role">Python · Data · AI</span></div><div class="social-heading">Making things<br /><em>happen.</em></div><div class="social-note">Python development & AI applications.</div><div class="social-mark">rt.</div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/social-card.png' })
  console.log('Saved desktop, mobile, and Proverbs previews to .cache/previews; social card to public/social-card.png.')
} finally { await browser.close() }
