/*

Open App

    Login 
        Find Products
    Log out 
    
    Login 
        Add to cart
    Log out 

Close App    

*/
import { test, expect, Page } from '@playwright/test';
let page:Page; // globally created page object to use in all the test cases

test.beforeAll('Open App', async({browser})=>{

    page = await browser.newPage();
    await page.goto('https://www.demoblaze.com/');
})

test.afterAll('Close app', async()=>{  // no need to pass the page here now as its globally created
    await page.close();
})

test.beforeEach('Login',async()=>{
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.locator('button[onclick="logIn()"]').click();
})

test.afterEach('Logout',async()=>{
    await page.locator('#logout2').click();
})

test.describe('Grouping',async()=>{

test('Find Products', async()=>{

    const products = page.locator('#tbodyid .hrefch');
    const count = await products.count();
    console.log('Total Products: '+count);
    expect(count).toBe(9);
})

test('Add to cart', async()=>{

    await page.locator("(//*[text()='Samsung galaxy s6'])[1]").click();

    // handle alert before clicking on add to cart button
    page.on('dialog',async(dialog)=>{
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();
    })

    await page.locator("text='Add to cart'").click();
})
})


// Note: good practice to keep hooks steps outside the grouping so that we can use for other groups as well