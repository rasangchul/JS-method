import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get stared link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('github click Test', async ({ page }) => {
    await page.goto('https://github.com/rasangchul/JS-method');

    await page.getByRole('button', { name: 'Code' }).click();

    await expect(document.querySelector('.Overlay__StyledOverlay-sc-51280t-0 dLmNWy'));
});

test('RealChart Click Test', async ({ page }) => {
    await page.goto('https://www.realchart.co.kr/demo/Basic/basic-bar');
    page.locator('label').filter({ hasText: '코드 보기' }).locator('div').first().click();
    const str = page.locator('.view-lines.monaco-mouse-cursor-text');
    const str2 = await str.innerText();
    console.log(str2);
});
