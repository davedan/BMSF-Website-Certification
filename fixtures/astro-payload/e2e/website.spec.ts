import { expect, test } from '@playwright/test'
test('homepage and detail page render CMS content, media and SEO metadata', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Reference works' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Published reference work' })).toBeVisible()
  await expect(page.getByText('Private draft work')).toHaveCount(0)
  await expect(page.locator('img')).toHaveAttribute('alt', /Blue geometric/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'http://127.0.0.1:4321/')
  await page.getByRole('link', { name: 'Published reference work' }).click()
  await expect(page.getByRole('heading', { name: 'Published reference work' })).toBeVisible()
})
test('navigation remains keyboard reachable at desktop and mobile widths', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 }); await page.goto('/'); await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'BMSF Reference Works' })).toBeFocused()
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
})
