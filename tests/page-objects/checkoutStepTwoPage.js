import { expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.checkoutStepTwoTitle = page.locator('.title');
    this.cartItem = page.locator('.cart_item');
    this.cartItemQuantity = page.locator('.cart_quantity');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.finishButton = page.locator('#finish');
    this.summaryInfo = page.locator('.summary_info');

    // Selected cart item variables
    var price;
  }

  async assertCartItem(itemName) {
    const item = this.cartItem.filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: new RegExp(`^${itemName}$`)
      })
    });
    this.price = await item.locator(this.cartItemPrice).textContent();
    await expect(this.cartItemName).toHaveText(itemName);
  }

  async assertCartStepTwoURL() {
    await expect(this.page).toHaveURL(process.env.CHECKOUT_STEP_TWO_URL);
  }

  async assertCheckoutStepTwoTitle() {
    await expect(this.checkoutStepTwoTitle).toHaveText("Checkout: Overview");
  }

  async assertPaymentInfo() {
    await expect(this.summaryInfo).toBeVisible();
  }


}
