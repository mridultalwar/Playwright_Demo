import{test,expect}from "@playwright/test";

test("verify the title",async ({page})=>{

    await page.goto("https://practice-automation.com/");

    let title:string = await page.title();

    console.log("Title:",title);

    await expect(page).toHaveTitle("Learn and Practice Automation | automateNow");
})