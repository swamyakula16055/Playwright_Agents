import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('1. Sign in', () => {
  test('Successful sign-in with the standard demo account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Starting from a fresh browser state, open https://www.saucedemo.com.
    await loginPage.goto();
    await expect(loginPage.loginForm).toBeVisible();

    // Enter standard_user as Username and secret_sauce as Password, then select Login.
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify Products page, six products, and empty cart.
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, empty');
  });
});
