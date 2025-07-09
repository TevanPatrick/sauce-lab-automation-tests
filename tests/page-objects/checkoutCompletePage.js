import { expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.checkoutCompleteTitle = page.locator('.title');
    this.successTickedIcon = page.locator('.pony_express');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');

  }

  async assertCheckoutCompleteURL() {
    await expect(this.page).toHaveURL(process.env.CHECKOUT_COMPLETE_URL);
  }

  async assertCheckoutCompleteTitle() {
    await expect(this.checkoutCompleteTitle).toHaveText("Checkout: Complete!");
  }

  async assertSuccessTickedIcon() {
    await expect(this.successTickedIcon).toBeVisible();
  }

  async assertCompleteHeading() {
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }

  async assertCompleteText() {
    await expect(this.completeText).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
  }


}
