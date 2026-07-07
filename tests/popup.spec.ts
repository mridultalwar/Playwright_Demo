import{test, expect, Page} from"@playwright/test";

test("handling diff tabs", async({browser})=>{

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");
    // await parentPage.locator("button",{hasText:'New Tab'}).click();


    // 1st Approach
    // await Promise.all([context.waitForEvent('page'), page.locator("#PopUp").click()]);

    // const allWindows = context.pages(); //Return array of pages
    // console.log("number of windows/pages: ", allWindows.length);

    // console.log(allWindows[0].url());
    // console.log(allWindows[1].url());
    
    // 2nd Approach
    // const pagePromise = page.waitForEvent('popup');
    // await page.locator("#PopUp").click();
    // const newpage = await pagePromise;
    // console.log(await newpage.url());

    // const pagePromise2 = page.waitForEvent('popup');
    // await page.locator("#PopUp").click();
    // const newpage2 = await pagePromise2;
    // console.log(await newpage2.url());

    //3rd Approach
   
    const pagePromise = page.waitForEvent('popup');
    await page.locator("#PopUp").click();
    await page.locator("#PopUp").click();
    const newpage = await pagePromise;

    const allWindows = context.pages(); //Return array of pages
    console.log("number of windows/pages: ", allWindows.length);

    console.log(allWindows[0].url()); 
    console.log(allWindows[1].url());

    for(let windows of allWindows){
        const title = await windows.title();
        if(title.includes('selenium')){
            await windows.close();
        }
    }



 
    
    
    

})