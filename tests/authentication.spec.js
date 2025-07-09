import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/loginPage.js';
import { InventoryPage } from './page-objects/inventoryPage.js';

let errors = []; 

test.beforeEach(async ({ page }) => {
  errors = []; 

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
});


test('Standard user - login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(process.env.STANDARD_USER, process.env.COMMON_PASSWORD);
  await inventoryPage.assertInventoryURL();
  await inventoryPage.assertInventoryTitle();
  await inventoryPage.assertInventoryList();

  await expect(errors).toEqual([]);

});

test('Locked out user - login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(process.env.LOCKED_OUT_USER, process.env.COMMON_PASSWORD);
  await loginPage.assertErrorUserLockedOut();

  await expect(errors).toEqual([]);

});

test('Error user - login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(process.env.ERROR_USER, process.env.COMMON_PASSWORD);

  await expect(errors).toEqual([]);

});

test('No username & password - login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login('', '');
  await loginPage.assertErrorUsernameMissing();

  await expect(errors).toEqual([]);

});

test('No username - login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login('', 'secret_sauce');
  await loginPage.assertErrorUsernameMissing();

  await expect(errors).toEqual([]);

});

test('No password - login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login('standard_user', '');
  await loginPage.assertErrorPasswordMissing();

  await expect(errors).toEqual([]);

});
