import {test, expect, Locator} from "@playwright/test";

test("Automawaiting and Forcing", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    // Auto- retrying assertions
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('//strong[normalize-space()="Featured products"]')).toHaveText('Featured products');


    // Non - retrying Assertions
    const title = await page.title();
    expect(title).toBe('Demo Web Shop');

    const welcomeText = await page.locator(' //h2[normalize-space()="Welcome to our store"]').textContent();
    expect(welcomeText?.includes('Welcome to our store')).toBeTruthy();
    

})