import { expect, test } from '@playwright/test';

const networkError = 'Unable to reach the server. Check your connection and try again.';

test.describe('InsightTrack smoke', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'InsightTrack Web Client' })).toBeVisible();
  });

  test('dashboard page renders summary cards without network error', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Total metrics')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent activity' })).toBeVisible();
    await expect(page.getByText('Morning run')).toBeVisible();
    await expect(page.getByText(networkError)).not.toBeVisible();
  });

  test('metrics page renders table data without network error', async ({ page }) => {
    await page.goto('/metrics');
    await expect(page.getByRole('heading', { name: 'Metrics' })).toBeVisible();
    await expect(page.getByText('Morning run')).toBeVisible();
    await expect(page.getByText(networkError)).not.toBeVisible();
  });

  test('reports page renders report sections without network error', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.getByRole('heading', { name: 'Reports' })).toBeVisible();
    await expect(page.getByText('Category breakdown')).toBeVisible();
    await expect(page.getByText('Trend overview')).toBeVisible();
    await expect(page.getByText(networkError)).not.toBeVisible();
  });

  test('filter interaction smoke', async ({ page }) => {
    await page.goto('/metrics');
    await expect(page.getByText('Morning run')).toBeVisible();

    await page.getByLabel(/Search/).fill('budget');

    await expect(page.getByText('Weekly budget review')).toBeVisible();
    await expect(page.getByText('Morning run')).not.toBeVisible();
  });

  test('form validation smoke', async ({ page }) => {
    await page.goto('/metrics');
    await page.getByRole('button', { name: 'Create metric' }).click();
    await expect(page.getByText('Title is required.')).toBeVisible();
  });
});
