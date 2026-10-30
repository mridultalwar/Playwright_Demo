/*
1. Run all the Sanity test cases
    npx playwright test tagging.spec.ts --grep @sanity

2. Run all the Regression test cases
    npx playwright test tagging.spec.ts --grep @regression

3. Run test cases belongs to sanity and regression both
    npx playwright test tagging.spec.ts --grep (?=.*@sanity)(?=.*@regression)
    
4. Run test cases belongs to sanity or regression
    npx playwright test tagging.spec.ts --grep @sanity|@regression

5. Run test cases belongs to sanity but not regression
    npx playwright test tagging.spec.ts --grep @sanity --grep-invert @regression

*/
import {test, expect} from "@playwright/test";

// test("@sanity @regression Checking the title of the page", async({page})=>{
//     await page.goto('https://www.google.com/');
//     await expect(page).toHaveTitle('Google');
// })


//Sanity tag is there
test('Checking the navigation to the store page',{tag:'@sanity'}, async({page})=>{
    await page.goto('https://www.google.com/');
    await page.locator("text='Store'").click();
    await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories');
})


// regression tag is there
test('Checking the title of the page',{tag:'@regression'}, async({page})=>{
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})


//Both Sanity and regression tags are there 
test('Checking the navigation to the store page',{tag:['@sanity','@regression']}, async({page})=>{
    await page.goto('https://www.google.com/');
    await page.locator("text='Store'").click();
    await expect(page).toHaveTitle('Google Store for Google Made Devices & Accessories');
})

