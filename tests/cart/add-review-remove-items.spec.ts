import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('3. Manage the cart', () => {
  test('Add items, review cart, and remove an item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Sign in and open products. Verify empty cart.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, empty');

    // Add Backpack and Bike Light. Verify controls change to Remove and cart count is two.
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.addProduct('Sauce Labs Bike Light');
    await expect(inventoryPage.removeProductButton('Sauce Labs Backpack')).toBeVisible();
    await expect(inventoryPage.removeProductButton('Sauce Labs Bike Light')).toBeVisible();
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, 2 items');

    // Open cart. Verify both items, quantity 1, prices, Continue Shopping and Checkout.
    await inventoryPage.openCart();
    await expect(cartPage.item('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(cartPage.quantity('Sauce Labs Backpack')).toHaveText('1');
    await expect(cartPage.item('Sauce Labs Bike Light')).toContainText('$9.99');
    await expect(cartPage.quantity('Sauce Labs Bike Light')).toHaveText('1');
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();

    // Remove Bike Light. Verify Backpack remains and count one.
    await cartPage.removeItem('Sauce Labs Bike Light');
    await expect(cartPage.item('Sauce Labs Bike Light')).toHaveCount(0);
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.cartButton).toHaveAccessibleName('Cart, 1 items');

    // Continue Shopping. Verify products and Backpack remains in cart.
    await cartPage.continueShopping();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.removeProductButton('Sauce Labs Backpack')).toBeVisible();
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, 1 items');
  });
});
