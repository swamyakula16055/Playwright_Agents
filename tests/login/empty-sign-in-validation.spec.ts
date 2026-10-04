import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('1. Sign in', () => {
  test('Validate empty sign-in fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting from a fresh browser state, open the login page and leave Username and Password blank.
    await loginPage.goto();
    await expect(loginPage.loginForm).toBeVisible();

    // Select Login. Verify required-field validation and remains on login.
    await loginPage.submit();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });
});
