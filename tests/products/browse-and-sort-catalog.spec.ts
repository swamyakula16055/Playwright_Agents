import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('2. Discover products', () => {
  test('Browse product details and sort the catalog', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // Sign in as standard_user / secret_sauce. Verify six products and default Name (A to Z) sort.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.sortControl).toHaveValue('az');

    // Open Sauce Labs Fleece Jacket details. Verify name, description, $49.99 price, add control, back to products.
    await inventoryPage.openProduct('Sauce Labs Fleece Jacket');
    await expect(productDetailsPage.productName).toHaveText('Sauce Labs Fleece Jacket');
    await expect(productDetailsPage.productDescription).toContainText('midweight quarter-zip fleece jacket');
    await expect(productDetailsPage.productPrice).toHaveText('$49.99');
    await expect(productDetailsPage.addToCartButton).toBeVisible();
    await expect(productDetailsPage.backToProductsButton).toBeVisible();

    // Return to products and choose Price (high to low). Verify Fleece Jacket first, Onesie last.
    await productDetailsPage.backToProducts();
    await inventoryPage.sortBy('hilo');
    await expect(inventoryPage.sortControl).toHaveValue('hilo');
    await expect(inventoryPage.productNameAt(0)).toContainText('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.productNameAt(5)).toContainText('Sauce Labs Onesie');

    // Choose Price (low to high), then Name (Z to A); verify sort selection and changed product order, with no cart additions.
    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.sortControl).toHaveValue('lohi');
    await expect(inventoryPage.productNameAt(0)).toContainText('Sauce Labs Onesie');
    await inventoryPage.sortBy('za');
    await expect(inventoryPage.sortControl).toHaveValue('za');
    await expect(inventoryPage.productNameAt(0)).toContainText('Test.allTheThings() T-Shirt (Red)');
    await expect(inventoryPage.cartButton).toHaveAccessibleName('Cart, empty');
  });
});
