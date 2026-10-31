import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('navigation works, updates metadata, and closes the mobile menu', async ({ page, isMobile }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rinzai Terrado')
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Resume', exact: true }).click()
  await expect(page).toHaveURL('/resume')
  await expect(page).toHaveTitle('Resume — Rinzai Terrado')
  await expect(page.getByRole('heading', { name: 'Okada Manila' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Python Developer, Data Science' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Data Analyst, Strategic Marketing' })).toBeVisible()
  if (isMobile) await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('main')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveTitle('Rinzai Terrado — Python Developer')
  expect(errors).toEqual([])
})

test('homepage leads to the biography and exposes the supplied social destinations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('img', { name: 'Rinzai Terrado', exact: true })).toHaveJSProperty('naturalWidth', 3024)
  await expect(page.getByRole('link', { name: /Instagram:/ })).toHaveAttribute('href', 'https://www.instagram.com/rinzai._/')
  await expect(page.getByRole('link', { name: 'Email Rinzai Terrado' })).toHaveAttribute('href', 'mailto:terradorinzai@gmail.com')
  await page.getByRole('link', { name: 'Learn More', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Get to Know me.')
  await expect(page.getByRole('img', { name: 'Rinzai Terrado', exact: true })).toHaveJSProperty('naturalWidth', 3024)
})

test('project filters change results and project detail routes survive reload', async ({ page }) => {
  await page.goto('/projects')
  await page.getByRole('button', { name: 'Learning tools' }).click()
  await expect(page.getByRole('article')).toHaveCount(1)
  await page.getByRole('link', { name: /StudyBuddy/ }).click()
  await expect(page).toHaveURL('/projects/study-buddy')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('StudyBuddy')
  await page.getByRole('link', { name: 'All projects', exact: true }).click()
  await expect(page.getByRole('article')).toHaveCount(4)
})

test('the resume has a direct PDF download and contact clipboard feedback works', async ({ page, context, browserName }) => {
  await page.goto('/resume')
  await expect(page.getByRole('link', { name: /Download resume/ })).toHaveAttribute('href', '/rinzai-terrado-resume.pdf')
  await expect(page.getByRole('link', { name: /Download resume/ })).toHaveAttribute('download', 'rinzai-terrado-resume.pdf')
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Copy email', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Email address copied to your clipboard.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('terradorinzai@gmail.com')
})

test('mobile menu can be dismissed with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation only')
  await page.goto('/')
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
})

test('new navigation exposes creative commissions and donation methods', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Commissions', exact: true }).click()
  await expect(page).toHaveURL('/commissions')
  await expect(page).toHaveTitle('Commissions — Rinzai Terrado')
  await expect(page.getByRole('link', { name: 'Explore the anniversary site', exact: false })).toHaveAttribute('href', 'https://3rdanniversary.rinzaiterrado.com/')
  await expect(page.getByRole('link', { name: 'Discuss a commission' })).toHaveAttribute('href', 'mailto:terradorinzai@gmail.com?subject=Creative%20website%20commission')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Personal stories.')
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Donate', exact: true }).click()
  await expect(page).toHaveURL('/donate')
  await expect(page).toHaveTitle('Donate — Rinzai Terrado')
  await expect(page.getByRole('heading', { name: 'MariBank', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'GCash', exact: true })).toBeVisible()
  for (const [name, path, width] of [['MariBank', '/maribank-qr.png', 710], ['GCash', '/gcash-qr.png', 912]] as const) {
    const image = page.getByRole('img', { name: `${name} donation QR code for Rinzai Terrado`, exact: true })
    await expect(image).toHaveAttribute('src', path)
    await expect(image).toHaveJSProperty('naturalWidth', width)
    await expect(page.getByRole('link', { name: `Open the full-size ${name} donation QR code` })).toHaveAttribute('href', path)
    await expect(page.getByRole('link', { name: `Save ${name} QR code` })).toHaveAttribute('download', '')
  }
  if (isMobile) await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  await page.goto('/proverbs')
  await expect(page.getByRole('blockquote').filter({ hasText: 'Heaven Favors the Foolish Monkey in Motion' })).toBeVisible()
})

for (const route of ['/', '/about', '/resume', '/projects', '/projects/forge-router', '/projects/study-buddy', '/projects/milady', '/projects/viral-cut', '/commissions', '/donate', '/proverbs', '/contact', '/missing-page']) {
  test(`accessible, responsive page at ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow, 'Page should not overflow horizontally').toBeFalsy()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(results.violations).toEqual([])
    expect(errors).toEqual([])
  })
}

test('important content is available without JavaScript', async ({ browser, baseURL }) => {
  const page = await browser.newPage({ javaScriptEnabled: false })
  await page.goto(`${baseURL}/projects/forge-router`)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ForgeRouter')
  await expect(page.getByText(/Roughly 50% lower token consumption/)).toBeVisible()
  await page.close()
})
