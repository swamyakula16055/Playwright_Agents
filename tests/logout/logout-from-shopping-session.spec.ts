import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { AppMenuPage } from '../pages/AppMenuPage';

test.describe('5. Log out', () => {
  test('Log out of an authenticated session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const appMenuPage = new AppMenuPage(page);

    // Sign in and verify Products page.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // Open navigation menu and select Logout. Verify login page and no authenticated catalog.
    await appMenuPage.open();
    await appMenuPage.logout();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(inventoryPage.pageTitle).toHaveCount(0);

    // Attempt to open the inventory page directly after logout.
    await inventoryPage.goto();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
