import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';

test.describe('4. Checkout', () => {
  test('Require customer information before checkout can continue', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);

    // Sign in, add Backpack, open cart, select Checkout. Verify First Name, Last Name, Zip/Postal Code.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await expect(checkoutInformationPage.firstName).toBeVisible();
    await expect(checkoutInformationPage.lastName).toBeVisible();
    await expect(checkoutInformationPage.postalCode).toBeVisible();

    // Leave all blank and Continue. Verify First Name required.
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('First Name is required');

    // Enter first name only and Continue. Verify Last Name required.
    await checkoutInformationPage.firstName.fill('Taylor');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Last Name is required');

    // Complete Last Name, leave postal code blank, Continue. Verify Zip/Postal Code required.
    await checkoutInformationPage.lastName.fill('Morgan');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Postal Code is required');
    await expect(checkoutInformationPage.pageTitle).toHaveText('Checkout: Your Information');
  });
});
