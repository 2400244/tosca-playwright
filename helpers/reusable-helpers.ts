import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { addMonths, format } from 'date-fns';

export async function logInScenario(
  page: Page,
  params: { URL: string; Email: string; Password: string }
): Promise<void> {
  await page.goto(params.URL);
  await page.waitForLoadState('networkidle');
  
  await page.waitForLoadState('domcontentloaded');
  
  await expect(page.locator('a.ico-login')).toBeVisible();
  
  await page.locator('a.ico-login').click();
  
  await page.locator('input#Email').fill(params.Email);
  
  await page.locator('input#Password').fill(params.Password);
  
  await page.locator('input.button-1.login-button').click();
  await page.waitForLoadState('networkidle');
}

export async function orderProduct(
  page: Page,
  params: { ProductLinkName: string; Quantity: string }
): Promise<void> {
  await page.locator(`a:has-text("${params.ProductLinkName}")`).click();
  
  await page.locator('input.button-2.product-box-add-to-cart-button').click();
  
  await page.locator('div.product-name').waitFor({ state: 'visible' });
  
  await page.locator('input.qty-input').fill(params.Quantity);
  
  await page.locator('input.button-2.add-to-cart-button').click();
}

export async function checkoutProcess(
  page: Page,
  params: { ShippingMethod: string; PaymentMethod: string }
): Promise<void> {
  await page.locator('input#termsofservice').click();
  
  await page.locator('button#checkout').click();
  
  await page.locator(`input[value="${params.ShippingMethod}"]`).click();
  
  await page.locator('input.button-1.shipping-method-next-step-button').click();
  
  await page.locator(`input[value="${params.PaymentMethod}"]`).click();
  
  await page.locator('input.button-1.payment-method-next-step-button').click();
  
  await page.locator('select#CreditCardType').selectOption('Visa');
  
  await page.locator('input#CardholderName').fill(faker.string.alpha(10));
  
  await page.locator('input#CardNumber').fill('4485564059489345');
  
  await page.locator('select#ExpireMonth').selectOption(format(addMonths(new Date(), 4), 'MM'));
  
  await page.locator('select#ExpireYear').selectOption(format(addMonths(new Date(), 0), 'yyyy'));
  
  await page.locator('input#CardCode').fill(faker.number.int({ min: 100, max: 999 }).toString());
  
  await page.locator('input.button-1.payment-info-next-step-button').click();
}

export async function confirmation(
  page: Page,
  params: Record<string, never>
): Promise<void> {
  await page.locator('input.button-1.confirm-order-next-step-button').click();
  await page.waitForLoadState('networkidle');
}
