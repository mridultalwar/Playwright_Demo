import{test, expect, Locator} from "@playwright/test";

test("Authentication Pop-Up", async ({page})=>{

    // await page.goto('https://demo.testautomationtv.com/browser-authentication/');
    // Approcah One
    await page.goto('http://admin:admin@the-internet.herokuapp.com/basic_auth');


})
test.only("Authentication Pop-Up second approach", async ({browser})=>{

    // Approcah Second
     const context = await browser.newContext({httpCredentials:{username:'admin@testautomationtv.com', password:'admin123'}});
     const page = await context.newPage();
     await page.goto('https://demo.testautomationtv.com/browser-authentication/');
     await page.locator('#try-auth-btn').click();


})