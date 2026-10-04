import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('1. Sign in', () => {
  test('Reject invalid sign-in credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting from a fresh browser state, open login page and enter invalid_user and wrong_password.
    await loginPage.goto();
    await loginPage.username.fill('invalid_user');
    await loginPage.password.fill('wrong_password');

    // Select Login. Verify remains on login and authentication mismatch error displays.
    await loginPage.submit();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
  });
});
