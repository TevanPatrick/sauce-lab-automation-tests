import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameTextbox = page.locator('#user-name');
    this.passwordTextbox = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container.error');
  }

  async login(username, password) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async assertErrorUsernameMissing() {
    await expect(this.errorMessage).toHaveText("Epic sadface: Username is required");
  }

  async assertErrorPasswordMissing() {
    await expect(this.errorMessage).toHaveText("Epic sadface: Password is required");
  }

  async assertErrorUserLockedOut() {
    await expect(this.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.LOGIN_URL);
  }
}
