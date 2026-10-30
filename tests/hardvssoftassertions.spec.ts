import {test, expect, chromium} from "playwright/test";

test("verify Hard and Soft Assertions", async()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://demowebshop.tricentis.com/");

    // Hard Assertions
    await expect(page).toHaveTitle("Demo Web Shop");
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");

    const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
    await expect(logo).toBeVisible();

    // soft Assertions
    await expect.soft(page).toHaveTitle("Demo Web Shop2"); //failed
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");
    
    const logo1 = page.locator('img[alt="Tricentis Demo Web Shop"]');
    await expect.soft(logo1).toBeVisible();


});
