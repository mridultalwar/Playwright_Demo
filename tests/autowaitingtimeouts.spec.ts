import {test, expect, Locator} from "@playwright/test";

test("Automawaiting and Forcing", async({browser})=>{
   
    test.setTimeout(60000); // applies to whole test execution
    const context = await browser.newContext();
    const page = await context.newPage();

    //page.setDefaultTimeout(60000) // applies to click(), fill(), locator(), waitForSelector(), etc.

    await page.goto('https://demowebshop.tricentis.com/');


    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');


    // Assertions  -- waiting time 5 seconds
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('.topic-html-content-header')).toBeVisible({timeout:6000}); // adding timeout for particular assertion

    //Actions   -- wiating time 30 seconds
    await page.locator('#small-searchterms').fill('Laptop',{force:true}); // force action(it will not do actionability checks)
    await page.locator('.button-1.search-box-button').click({force:true}); // on click force action(it will not do actionability checks)


})