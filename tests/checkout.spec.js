const { test, expect } = require('@playwright/test');

test('user can sign up and complete the checkout process', async ({ page }) => {
  // Navigate to the signup page
  await page.goto('/signup');

  // Fill out the registration form
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for the redirect to the pricing page
  await page.waitForURL('/pricing');

  // Select a plan
  await page.click('button:has-text("Choose Pro")');

  // Wait for the redirect to the checkout page
  await page.waitForURL('/checkout');

  // Fill in the Stripe checkout form (using mock data)
  // In a real test, you would use Stripe's test card numbers.
  await page.frameLocator('iframe[name^="__privateStripeFrame"]').locator('input[name="cardnumber"]').fill('4242 4242 4242 4242');
  await page.frameLocator('iframe[name^="__privateStripeFrame"]').locator('input[name="exp-date"]').fill('12 / 25');
  await page.frameLocator('iframe[name^="__privateStripeFrame"]').locator('input[name="cvc"]').fill('123');
  await page.frameLocator('iframe[name^="__privateStripeFrame"]').locator('input[name="postal"]').fill('12345');
  
  // Click the pay button
  await page.click('button:has-text("Pay")');

  // Verify the success page
  await page.waitForURL('/dashboard');
  await expect(page.locator('h1')).toHaveText('Your Environments');
});
