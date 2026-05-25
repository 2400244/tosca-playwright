import { test, expect } from '@playwright/test';

test.describe('DemoWebShop_Order_Creation|Buiseness Parameters|RTB', () => {
  test('complete order creation workflow with discount and payment', async ({ page }) => {
    // OpenUrl
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForLoadState('networkidle');

    // TBox Wait
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    // WebShop | Top Menu - Click on Login Button (Constraint)
    await expect(page.locator('a.ico-login')).toBeVisible();
    await page.waitForLoadState('networkidle');

    // WebShop | Top Menu - Click on Login Button
    await page.locator('a.ico-login').click();

    // WebShop | Log In Page - Enter Valid Email and Password and Click on Log in button
    await page.locator('input#Email').fill('sr.Tester123@gmail.com');
    await page.locator('input#Password').fill('Tester123');
    await page.locator('input.button-1.login-button').click();
    await page.waitForLoadState('networkidle');

    // TBox Wait
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    // WebShop | Products Choice Tab - Navigate to Products Choice Tab and click on APPAREL & SHOES
    await page.locator('a[href="/apparel-shoes"]').first().click();
    await page.waitForLoadState('networkidle');

    // WebShop | Apparel & Shoes Product Selection - Navigate to Blue Jeans and click on Blue Jeans
    await page.getByRole('link', { name: 'Blue Jeans', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Blue Jeans - Enter the Quantity for Blue jeans and Click on add to cart (Transition)
    await page.locator('input.qty-input').fill('2');
    await page.locator('#add-to-cart-button-36').click();

    // WebShop | Blue Jeans - Enter the Quantity for Blue jeans and Click on add to cart
    await page.locator('p.content').waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');

    // WebShop | Shopping Cart - Enter discount code, apply coupon, check terms, checkout
    await page.getByRole('link', { name: 'shopping cart', exact: true }).click();
    await page.locator('input.discount-coupon-code').fill('DISCOUNT10');
    await page.locator('input[name="applydiscountcouponcode"]').click();
    await page.locator('input#termsofservice').check();
    await page.locator('button#checkout').click();

    // WebShop | Shopping Cart - Constraint check
    await expect(page.locator('div.page-title')).toBeVisible();

    // WebShop | Billing Address - Click on continue button
    await page.locator('#billing-buttons-container').getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Shipping Address - Click on continue button
    await page.locator('#shipping-buttons-container').getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Shipping Method - Select Ground and click continue
    await page.locator('#shippingoption_1').check();
    await page.locator('#shipping-method-buttons-container').getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Payment Method - Select payment method and click continue
    await page.locator('#paymentmethod_1').check();
    await page.locator('#payment-method-buttons-container').getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Payment Information - Enter card details and click continue
    await page.locator('input#CardholderName').fill('Test User');
    await page.locator('input#CardNumber').fill('4485564059489345');
    await page.locator('input#CardCode').fill('123');
    await page.locator('#payment-info-buttons-container').getByRole('button', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Confirm Order - Click confirm button
    await page.locator('#confirm-order-buttons-container').getByRole('button', { name: 'Confirm' }).click();
    await page.waitForLoadState('networkidle');

    // WebShop | Order Confirmation - Verify order success
    await expect(page.locator('div.page-title')).toContainText('Thank you');
  });
});