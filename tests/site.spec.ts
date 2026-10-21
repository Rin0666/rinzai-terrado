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
  if (isMobile) await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('main')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveTitle('Rinzai Terrado — Python Developer')
  expect(errors).toEqual([])
})

test('homepage leads to the biography and exposes the supplied social destinations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /Instagram:/ })).toHaveAttribute('href', 'https://www.instagram.com/rinzai._/')
  await expect(page.getByRole('link', { name: 'Email Rinzai Terrado' })).toHaveAttribute('href', 'mailto:terradorinzai@gmail.com')
  await page.getByRole('link', { name: 'Learn More', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Get to Know me.')
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

test('the original resume is downloadable and contact clipboard feedback works', async ({ page, context, browserName }) => {
  const response = await page.request.get('/rinzai-terrado-resume.pdf')
  expect(response.ok()).toBeTruthy()
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  await page.goto('/resume')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: /Download resume/ }).click()
  expect((await downloadPromise).suggestedFilename()).toBe('rinzai-terrado-resume.pdf')
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

for (const route of ['/', '/about', '/resume', '/projects', '/projects/forge-router', '/projects/study-buddy', '/projects/milady', '/projects/viral-cut', '/proverbs', '/contact', '/missing-page']) {
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
