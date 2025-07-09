import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/loginPage.js';
import { InventoryPage } from './page-objects/inventoryPage.js';
import { CartPage } from './page-objects/cartPage.js';
import { CheckoutStepOnePage} from './page-objects/checkoutStepOnePage.js';
import { CheckoutStepTwoPage} from './page-objects/checkoutStepTwoPage.js';
import { CheckoutCompletePage } from './page-objects/checkoutCompletePage.js';

test('Complete checkout', async ({ page }) => {

  const errors = [];

  // Listen for console events
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  const price = await inventoryPage.price;
  const cartPrice = await cartPage.price;

  // Login
  await loginPage.navigateToLoginPage();
  await loginPage.login(process.env.STANDARD_USER, process.env.COMMON_PASSWORD);

  // Add item to cart
  await inventoryPage.addToCart(process.env.INVENTORY_ITEM);

  // Verify - Shopping cart badge equals 1
  await inventoryPage.assertCartBadge(1);

  // Go to cart
  await inventoryPage.viewCart();
  await cartPage.assertCartURL();

  // Verify - cart items
  await cartPage.assertCartItem(process.env.INVENTORY_ITEM);
  await expect(price).toBe(cartPrice);

  // Continue to checkout
  await cartPage.checkoutButton.click();
  await checkoutStepOnePage.assertCartStepOneURL();

  // Verify - Shopping cart badge equals 1
  await inventoryPage.assertCartBadge(1);

  // Enter Your Information
  await checkoutStepOnePage.fillInformation();
  await checkoutStepOnePage.continueButton.click();
  await checkoutStepTwoPage.assertCartStepTwoURL();
  await checkoutStepTwoPage.assertCheckoutStepTwoTitle();

  // Verify - Shopping cart badge equals 1
  await inventoryPage.assertCartBadge(1);

  // Verify - Checkout: Overview
  await checkoutStepTwoPage.assertCartItem(process.env.INVENTORY_ITEM);
  await expect(price).toBe(cartPrice);
  await checkoutStepTwoPage.assertPaymentInfo();

  // Finish checkout flow
  await checkoutStepTwoPage.finishButton.click();

  // Verify - Complete page loaded
  await checkoutCompletePage.assertCheckoutCompleteURL();
  await checkoutCompletePage.assertCheckoutCompleteTitle();
  await checkoutCompletePage.assertSuccessTickedIcon();
  await checkoutCompletePage.assertCompleteHeading();
  await checkoutCompletePage.assertCompleteText();

  // Verify - Cart badge count reset
  await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

  // Go back to home/inventory
  await checkoutCompletePage.backHomeButton.click();
  await inventoryPage.assertInventoryURL();

  await expect(errors).toEqual([]);

});