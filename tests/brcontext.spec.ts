/*

Browser -- chromium, firefox, safari

Context -- Incognito Window / Separate User Session

Page -- New tabs, window, pop up 

*/

import{test, expect, Locator, chromium} from "@playwright/test";

test("Browser Context Demo", async()=>{


    const browser = await chromium.launch(); // create browser
    const context = await browser.newContext(); // create session or context


    const page1 = await context.newPage();
    await page1.goto("https://playwright.dev/");

    const page2 = await context.newPage();
    await page2.goto("https://www.selenium.dev/")

    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);

})

