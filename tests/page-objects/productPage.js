import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.productImage = page.locator('.inventory_details_img_container');
    this.productDetails = page.locator('.inventory_details_desc_container');

  }

  async assertProductURL(productURL) {
    await expect(this.page).toHaveURL(productURL);
  }

  async assertProductImage() {
    await expect(this.productImage).toBeVisible();
  }

  async assertProductDetails() {
    await expect(this.productDetails).toBeVisible();
  }

}
