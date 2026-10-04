import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('4. Checkout', () => {
  test('Complete checkout and verify order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Sign in, add Fleece Jacket, open cart and Checkout.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProduct('Sauce Labs Fleece Jacket');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await expect(checkoutInformationPage.pageTitle).toHaveText('Checkout: Your Information');

    // Enter Taylor, Morgan, 94105, Continue. Verify item, payment, shipping and totals: $49.99 + $4.00 tax = $53.99.
    await checkoutInformationPage.completeInformation('Taylor', 'Morgan', '94105');
    await checkoutInformationPage.continue();
    await expect(checkoutOverviewPage.item('Sauce Labs Fleece Jacket')).toContainText('$49.99');
    await expect(checkoutOverviewPage.paymentInformation).toContainText('SauceCard #31337');
    await expect(checkoutOverviewPage.shippingInformation).toContainText('Free Pony Express Delivery!');
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $49.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $4.00');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $53.99');

    // Finish. Verify order confirmation, dispatch message, cart empty, Back Home.
    await checkoutOverviewPage.finish();
    await expect(checkoutCompletePage.confirmationHeading).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.dispatchMessage).toContainText('Your order has been dispatched');
    await expect(checkoutCompletePage.cartButton).toHaveAccessibleName('Cart, empty');
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
  });
});
