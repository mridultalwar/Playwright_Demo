import {test,expect} from "@playwright/test"

test('URL Validation', async ({page})=>{
    
    await page.goto("https://practice-automation.com/");

    let Url:string = page.url();
    console.log(Url);

    await expect(page).toHaveURL(/automation/);
});