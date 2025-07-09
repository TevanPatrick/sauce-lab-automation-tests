import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsTitle = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItem = page.locator('.inventory_item');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
    this.shoppingCartIcon = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');

    // Selected inventory item variables
    var price;
  }

  async addToCart(itemName) {
    const productCard = this.inventoryItem.filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: new RegExp(`^${itemName}$`)
      })
    });
    await productCard.locator('button:has-text("Add to cart")').click();
    this.price = await productCard.locator(this.inventoryItemPrice).textContent();
  }

  async viewCart() {
    await this.shoppingCartIcon.click();
  }
  
  async assertCartBadge(num_of_items) {
    await expect(this.shoppingCartBadge).toHaveText(String(num_of_items));
  }

  async assertInventoryTitle() {
    await expect(this.productsTitle).toHaveText("Products");
  }

  async assertInventoryList() {
    await expect(this.inventoryList).toBeVisible();
  }

  async assertInventoryURL() {
    await expect(this.page).toHaveURL(process.env.INVENTORY_URL);
  }

}
