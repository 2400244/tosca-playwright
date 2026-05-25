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
    await page.locator('input#Email').fill('testuser@example.com');
    await page.locator('input#Password').fill('Password123');
    await page.locator('input.button-1.login-button').click();
    await page.waitForLoadState('networkidle');

    // TBox Wait
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    // TBox Set Buffer
    const bufferData = await page.locator('a.account').textContent();
    await page.waitForLoadState('networkidle');

    // WebShop | Products Choice Tab - Navigate to Products Choice Tab and click on APPAREL & SHOES
    await page.locator('a[href="/apparel-shoes"]').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Apparel & Shoes Product Selection - Navigate to Blue Jeans and click on Blue Jeans
    await page.locator('a:has-text("Blue Jeans")').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Blue Jeans - Enter the Quantity for Blue jeans and Click on add to cart (Transition)
    await page.locator('input.qty-input').fill('2');
    await page.locator('input.button-2.add-to-cart-button').click();

    // WebShop | Blue Jeans - Enter the Quantity for Blue jeans and Click on add to cart
    await page.locator('p.content').waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');

    // WebShop | Shopping Cart - Enter discount code, apply coupon, check terms, checkout
    await page.locator('a:has-text("shopping cart")').click();
    await page.locator('input.discount-coupon-code').fill('DISCOUNT10');
    await page.locator('input[name="applydiscountcouponcode"]').click();
    await page.locator('input#termsofservice').check();
    await page.locator('button#checkout').click();

    // WebShop | Shopping Cart - Constraint check
    await expect(page.locator('div.page-title')).toBeVisible();

    // WebShop | Billing Address - Click on continue button
    await page.locator('input.button-1.new-address-next-step-button').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Shipping Address - Click on continue button
    await page.locator('input.button-1.new-address-next-step-button').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Shipping Method - Choose shipping method as ground and click continue
    await page.locator('input#shippingoption_0').check();
    await page.locator('input.button-1.shipping-method-next-step-button').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Payment Methods - Choose Payment Method as Credit Card and click continue
    await page.locator('input#paymentmethod_1').check();
    await page.locator('input.button-1.payment-method-next-step-button').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Payment Information Credit Card - Enter Credit Card details and click continue
    await page.locator('select#CreditCardType').selectOption('Visa');
    await page.locator('input#CardholderName').fill('Test User');
    await page.locator('input#CardNumber').fill('4485564059489345');
    await page.locator('select#ExpireMonth').selectOption('12');
    await page.locator('select#ExpireYear').selectOption('2025');
    await page.locator('input#CardCode').fill('123');
    await page.locator('input.button-1.payment-info-next-step-button').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Confirm Order - Verification the Prices in Confirm Order page
    await expect(page.locator('span.product-subtotal')).toContainText('$');

    // WebShop | Confirm Order - Click on Confirm button
    await page.locator('input.button-1.confirm-order-next-step-button').click();
    await page.waitForLoadState('networkidle');

    // WebShop | Order Successful - Check for order successful message and order number (Constraint)
    await expect(page.locator('div.title strong')).toBeVisible();

    // WebShop | My Account Navigation - Click on Orders tab
    await page.locator('a[href="/customer/orders"]').click();

    // Webshop | Order Details - Check the Order Details (Constraint)
    await expect(page.locator('div.order-list')).toBeVisible();
    await page.waitForLoadState('networkidle');

    // CloseBrowser - Close Web Shop
    await page.close();
  });
});
