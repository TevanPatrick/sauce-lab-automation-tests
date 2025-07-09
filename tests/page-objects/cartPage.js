import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.cartItem = page.locator('.cart_item');
    this.cartItemQuantity = page.locator('cart_quantity');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButton = page.locator('#remove');

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

  async assertCartURL() {
    await expect(this.page).toHaveURL(process.env.CART_URL);
  }

  async assertCartTitle() {
    await expect(this.cartTitle).toHaveText("Your Cart");
  }

  async removeCartItem(itemName) {
    const item = this.cartItem.filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: new RegExp(`^${itemName}$`)
      })
    });
    await item.locator('button:has-text("Remove")').click();
  }

}
