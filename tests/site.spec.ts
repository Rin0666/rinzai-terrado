import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const sections = ['about', 'resume', 'projects', 'commissions', 'proverbs', 'contact', 'donate']

async function expectSectionAtTop(page: import('@playwright/test').Page, id: string) {
  await expect.poll(async () => page.locator(`#${id}`).evaluate(element => {
    const top = element.getBoundingClientRect().top
    const headerBottom = document.querySelector('.site-header')!.getBoundingClientRect().bottom
    return top >= headerBottom - 1 && top < headerBottom + 130
  })).toBe(true)
}

test('top navigation jumps through every section without leaving the page', async ({ page, isMobile }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await page.locator('main').evaluate(element => element.setAttribute('data-navigation-check', 'same-document'))
  for (const id of sections) {
    if (isMobile) await page.getByRole('button', { name: 'Menu', exact: true }).click()
    const link = page.getByRole('navigation', { name: 'Main navigation' }).locator(`a[href="#${id}"]`)
    await link.click()
    await expect(page).toHaveURL(`/#${id}`)
    await expectSectionAtTop(page, id)
    await expect(page.locator(`#primary-navigation a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location')
    await expect(page.locator(`#${id}`)).toBeFocused()
    await expect(page.locator('main')).toHaveAttribute('data-navigation-check', 'same-document')
    if (isMobile) await expect(page.getByRole('button', { name: 'Menu', exact: true })).toHaveAttribute('aria-expanded', 'false')
  }
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rinzai Terrado')
  await expect(page).toHaveTitle('Rinzai Terrado — Python Developer')
  expect(errors).toEqual([])
})

test('scrolling updates the active navigation and history restores section links', async ({ page }) => {
  await page.goto('/#about')
  await expectSectionAtTop(page, 'about')
  await page.locator('#resume').evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }))
  const nav = page.locator('#primary-navigation')
  await expect(nav.locator('a[href="#resume"]')).toHaveAttribute('aria-current', 'location')
  await page.locator('#about .text-link').click()
  await expect(page).toHaveURL('/#resume')
  await expectSectionAtTop(page, 'resume')
  await page.goBack()
  await expect(page).toHaveURL('/#about')
  await expectSectionAtTop(page, 'about')
})

test('Learn More leads to the biography and both supplied portraits load', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#home img')).toHaveJSProperty('naturalWidth', 3024)
  await page.getByRole('link', { name: 'Learn More', exact: true }).click()
  await expect(page).toHaveURL('/#about')
  await expectSectionAtTop(page, 'about')
  await expect(page.locator('#about img')).toHaveJSProperty('naturalWidth', 3024)
  await expect(page.getByRole('link', { name: /Instagram:/ })).toHaveAttribute('href', 'https://www.instagram.com/rinzai._/')
  await expect(page.getByRole('link', { name: 'Email Rinzai Terrado' })).toHaveAttribute('href', 'mailto:terradorinzai@gmail.com')
})

test('only the two retained projects are shown and notes expand in place', async ({ page }) => {
  await page.goto('/#projects')
  await expect(page.locator('#projects details')).toHaveCount(2)
  await expect(page.locator('main')).not.toContainText('MiLady')
  await expect(page.locator('main')).not.toContainText('ViralCut')
  await page.getByRole('button', { name: 'Learning tools' }).click()
  await expect(page.locator('#project-forge-router')).toBeHidden()
  const study = page.locator('#project-study-buddy')
  await expect(study).toBeVisible()
  await study.locator('summary').click()
  await expect(study).toHaveAttribute('open', '')
  await expect(study.getByRole('heading', { name: 'Current outcome' })).toBeVisible()
  await expect(page).toHaveURL('/#projects')
  await page.getByRole('button', { name: 'All projects' }).click()
  await expect(page.locator('#project-forge-router')).toBeVisible()
})

test('project deep links open notes on reload and reveal a filtered project', async ({ page }) => {
  await page.goto('/#project-study-buddy')
  await expect(page.locator('#project-study-buddy')).toHaveAttribute('open', '')
  await expectSectionAtTop(page, 'project-study-buddy')
  await page.reload()
  await expect(page.locator('#project-study-buddy')).toHaveAttribute('open', '')
  await expectSectionAtTop(page, 'project-study-buddy')
  await page.getByRole('button', { name: 'Learning tools' }).click()
  await page.locator('#resume').evaluate(element => element.scrollIntoView({ behavior: 'instant' }))
  await page.locator('#resume').getByRole('link', { name: 'ForgeRouter', exact: true }).click()
  await expect(page).toHaveURL('/#project-forge-router')
  await expect(page.locator('#project-forge-router')).toBeVisible()
  await expect(page.locator('#project-forge-router')).toHaveAttribute('open', '')
  await expectSectionAtTop(page, 'project-forge-router')
})

test('resume download, career details, and contact clipboard feedback work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#resume')
  await expect(page.getByRole('link', { name: /Download resume/ })).toHaveAttribute('href', '/rinzai-terrado-resume.pdf')
  await expect(page.getByRole('link', { name: /Download resume/ })).toHaveAttribute('download', 'rinzai-terrado-resume.pdf')
  await expect(page.getByRole('heading', { name: 'Python Developer, Data Science', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Data Analyst, Strategic Marketing', exact: true })).toBeVisible()
  await page.locator('#contact').getByRole('button', { name: 'Copy email', exact: true }).click()
  await expect(page.locator('#contact').getByRole('status')).toHaveText('Email address copied to your clipboard.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('terradorinzai@gmail.com')
})

test('commissions, proverbs and original donation images remain available', async ({ page }) => {
  await page.goto('/#commissions')
  await expect(page.getByRole('link', { name: 'Explore the anniversary site', exact: false })).toHaveAttribute('href', 'https://3rdanniversary.rinzaiterrado.com/')
  await expect(page.getByRole('link', { name: 'Discuss a commission' })).toHaveAttribute('href', 'mailto:terradorinzai@gmail.com?subject=Creative%20website%20commission')
  await expect(page.locator('#proverbs')).toContainText('Heaven Favors the Foolish Monkey in Motion')
  for (const [name, path, width] of [['MariBank', '/maribank-qr.png', 710], ['GCash', '/gcash-qr.png', 912]] as const) {
    const image = page.getByRole('img', { name: `${name} donation QR code for Rinzai Terrado`, exact: true })
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('src', path)
    await expect(image).toHaveJSProperty('naturalWidth', width)
    await expect(page.getByRole('link', { name: `Open the full-size ${name} donation QR code` })).toHaveAttribute('href', path)
    await expect(page.getByRole('link', { name: `Save ${name} QR code` })).toHaveAttribute('download', '')
  }
})

test('mobile menu supports Escape and outside dismissal', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation only')
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Menu', exact: true })
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page.getByRole('link', { name: 'Rinzai Terrado, home' }).click()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('old page and project URLs lead to their sections', async ({ page }) => {
  for (const [path, hash] of [
    ...sections.map(id => [`/${id}`, id]),
    ['/projects/forge-router', 'project-forge-router'],
    ['/projects/study-buddy', 'project-study-buddy'],
    ['/projects/milady', 'projects'],
    ['/projects/viral-cut', 'projects'],
  ]) {
    await page.goto(path)
    await expect(page).toHaveURL(`/#${hash}`)
    await expectSectionAtTop(page, hash)
  }
})

for (const route of ['/', '/missing-page']) {
  test(`accessible, responsive page at ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBeFalsy()
    if (route !== '/') {
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await expect(page.locator('#primary-navigation [aria-current]')).toHaveCount(0)
    }
    // Include the expanded notes in the accessibility review.
    if (route === '/') for (const summary of await page.locator('#projects summary').all()) await summary.click()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(results.violations).toEqual([])
    expect(errors).toEqual([])
  })
}

test('sections, anchor navigation and project notes work without JavaScript', async ({ browser, baseURL }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, reducedMotion: 'reduce' })
  try {
    await page.goto(`${baseURL}/`)
    for (const id of sections) await expect(page.locator(`#${id}`)).toBeAttached()
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(page).toHaveURL(`${baseURL}/#projects`)
    await page.locator('#project-forge-router summary').click()
    await expect(page.getByText(/Roughly 50% lower token consumption/)).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rinzai Terrado')
  } finally { await page.close() }
})

test('reduced motion disables smooth scrolling and direct section links remain visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#contact')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  await expectSectionAtTop(page, 'contact')
  await page.reload()
  await expectSectionAtTop(page, 'contact')
})
