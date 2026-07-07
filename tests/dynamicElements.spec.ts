import {test, expect, Locator} from "@playwright/test";

test("Verifying Dynamic xpath", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    for(let i=0; i<5; i++){
    const buttonClick:Locator = page.locator("//button[@name='start' or @name='stop']");

    await buttonClick.click();
    
    await page.waitForTimeout(2000);
    console.log(await buttonClick.textContent());


    }

     //using getByRole()

     for(let i=0; i<5; i++){
     const button:Locator = page.getByRole("button",{name:/start|stop/i});
     await button.click();
     await page.waitForTimeout(2000);
     console.log(await button.textContent());
     }

})
