import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/loginPage.js';
import { InventoryPage } from './page-objects/inventoryPage.js';
import { CartPage } from './page-objects/cartPage.js';
import { ProductPage } from './page-objects/productPage.js';
import { CheckoutStepOnePage} from './page-objects/checkoutStepOnePage.js';

let errors = []; 
 
test.beforeEach(async ({ page }) => {

    errors = []; 

    page.on('console', msg => {
        if (msg.type() === 'error') {
        errors.push(msg.text());
        }
    });

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(process.env.STANDARD_USER, process.env.COMMON_PASSWORD);

});

test('View empty cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // View empty cart
    await inventoryPage.viewCart();
    await cartPage.assertCartTitle();
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.cartItem).not.toBeVisible();
    
    await expect(errors).toEqual([]);

});

test('Remove cart item to empty cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Add item to cart
    await inventoryPage.addToCart(process.env.INVENTORY_ITEM);
    await inventoryPage.viewCart();

    // Remove item
    await cartPage.removeCartItem(process.env.INVENTORY_ITEM);
    await expect(cartPage.cartItem).not.toBeVisible();

    await expect(errors).toEqual([]);
    
});

test('View product page', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);

    // Add item to cart
    await inventoryPage.addToCart(process.env.INVENTORY_ITEM);
    await inventoryPage.viewCart();

    // View product page
    await cartPage.cartItemName.click();
    await productPage.assertProductURL(process.env.INVENTORY_ITEM_URL);
    await productPage.assertProductImage();
    await productPage.assertProductDetails();
    
    await expect(errors).toEqual([]);

});

test('Continue shopping', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);

    // Add item to cart
    await inventoryPage.addToCart(process.env.INVENTORY_ITEM);
    await inventoryPage.viewCart();

    // Continue shopping
    await cartPage.continueShoppingButton.click();
    await inventoryPage.assertInventoryURL();
    await inventoryPage.assertInventoryList();
    
    await expect(errors).toEqual([]);

});

test('Checkout', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    // Add item to cart
    await inventoryPage.addToCart(process.env.INVENTORY_ITEM);
    await inventoryPage.viewCart();

    // Checkout
    await cartPage.checkoutButton.click();
    await checkoutStepOnePage.assertCartStepOneURL();
    await checkoutStepOnePage.assertCheckoutStepOneTitle();

    await expect(errors).toEqual([]);

});