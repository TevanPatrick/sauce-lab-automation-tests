import { expect } from '@playwright/test';

export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page;
    this.checkoutStepOneTitle = page.locator('.title');
    this.infoFirstName = page.locator('#first-name');
    this.infoLastName = page.locator('#last-name');
    this.infoPostalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');

  }

  async fillInformation() {
    await this.infoFirstName.fill(process.env.FIRST_NAME);
    await this.infoLastName.fill(process.env.LAST_NAME);
    await this.infoPostalCode.fill(process.env.POSTAL_CODE);
  }

  async assertCartStepOneURL() {
    await expect(this.page).toHaveURL(process.env.CHECKOUT_STEP_ONE_URL);
  }

  async assertCheckoutStepOneTitle() {
    await expect(this.checkoutStepOneTitle).toHaveText("Checkout: Your Information");
  }

}
