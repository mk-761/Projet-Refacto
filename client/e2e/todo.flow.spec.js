// @ts-check

import { test, expect } from '@playwright/test';

import { mockTodosAPI } from './fixtures/api-mock';

 

test('user can add a new todo', async ({ page }) => {

  await mockTodosAPI(page, []);

  await page.goto('/');

  await page.getByPlaceholder('New Item').fill('Buy milk');

  await page.getByRole('button', { name: 'Add Item' }).click();

  await expect(page.getByText('Buy milk')).toBeVisible();

});

 

test('user can mark todo as completed', async ({ page }) => {

  await mockTodosAPI(page, [{ id: 1, name: 'Buy milk', completed: false }]);

  await page.goto('/');

  let todo = page.locator('div.item.container-fluid').filter({ hasText: 'Buy milk' });

  await todo.locator("[aria-label='Mark item as complete']").click();

  todo = page.locator('div.item.completed.container-fluid').filter({ hasText: 'Buy milk' });

  await expect(todo).toBeVisible();

});

 

test('user can unmark todo as incomplete', async ({ page }) => {

  await mockTodosAPI(page, [{ id: 1, name: 'Buy milk', completed: true }]);

  await page.goto('/');

  let todo = page.locator('div.item.completed.container-fluid').filter({ hasText: 'Buy milk' });

  await todo.locator("[aria-label='Mark item as incomplete']").click();

  todo = page.locator('div.item.container-fluid').filter({ hasText: 'Buy milk' });

  await expect(todo).toBeVisible();

});

 

test('user can delete a todo', async ({ page }) => {

  await mockTodosAPI(page, [{ id: 1, name: 'Buy milk', completed: true }]);

  await page.goto('/');

  let todo = page.locator('div.item.container-fluid').filter({ hasText: 'Buy milk' });

  await todo.locator("[aria-label='Remove Item']").click();

  await expect(todo).not.toBeVisible();

});