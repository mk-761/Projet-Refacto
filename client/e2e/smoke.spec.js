import { test, expect } from '@playwright/test';
import { mockTodosAPI } from './fixtures/api-mock';

test('homepage loads and has title', async ({ page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Todo App');
});

test('todo interface loads', async ({ page }) => {
    await mockTodosAPI(page, []);
    await page.goto('/');
    await expect(page.getByText('Hello world!')).toBeVisible();
});