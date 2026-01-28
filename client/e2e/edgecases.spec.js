// @ts-check

import { test, expect } from '@playwright/test';

import { mockTodosAPI } from './fixtures/api-mock';

 

test('cannot add empty todos', async ({ page }) => {

  await mockTodosAPI(page, []);

  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Add Item' })).toHaveAttribute('disabled');

});

 

test('todos persist after reload', async ({ page }) => {

  await mockTodosAPI(page, []);

  await page.goto('/');

  await page.getByPlaceholder('New Item').fill('Buy milk');

  await page.getByRole('button', { name: 'Add Item' }).click();

  await expect(page.getByText('Buy milk')).toBeVisible();

  await page.reload();

  await expect(page.getByText('Buy milk')).toBeVisible();

});