import{test, expect, Locator, chromium} from"@playwright/test";

test("handling diff tabs", async()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const parentPage = await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/");
    // await parentPage.locator("button",{hasText:'New Tab'}).click();

    const [childPage]= await Promise.all([context.waitForEvent('page'),parentPage.locator("button",{hasText:'New Tab'}).click()]);

    
    // Aprroach 1: Switch between the tabs and get title
    const pages = context.pages(); // return an array 
    console.log("Number of tabs present", pages.length);

    console.log("titile of page1: ", await pages[0].title());
    console.log("titile of page1: ", await pages[1].title());

    //Aprroach 2: alternate
    console.log("titile of ParentPage: ", await parentPage.title());
    console.log("titile of ChildPage: ", await childPage.title());
    

})