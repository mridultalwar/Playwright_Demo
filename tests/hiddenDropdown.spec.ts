import {test, expect, Locator} from "@playwright/test";

test("Bootstrap hidden dropdown", async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();

    // click on PIM 
    await page.getByText("PIM").click();

    // click on job title dropdown 
    await page.locator("form i").nth(2).click();
    await page.waitForTimeout(3000);

    // count of the options
    const jobOptions:Locator = await page.locator("div[role='listbox'] span");
    const countJobOptions:number = await jobOptions.count();
    console.log(countJobOptions);
    expect(countJobOptions).toBe(28);

    // printing all the avaialable options
    const jobOptionsValue:string[]= await jobOptions.allInnerTexts();
    console.log(jobOptionsValue);

    //or
    for(let i=0; i<countJobOptions; i++){
    console.log(`Option ${i + 1}: ${await jobOptions.nth(i).innerText()}`); 
   }

   // select any option from the options 
   for(let j=0; j<countJobOptions; j++){
    const valueSelection = await jobOptions.nth(j).textContent();
    if(valueSelection==='Automation Tester'){
         await jobOptions.nth(j).click();
         break;
   }
}
    await page.waitForTimeout(5000);
    
})