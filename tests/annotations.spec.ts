/*
Annotations :

only
skip
fail
fixme
slow

*/


import {test, expect} from '@playwright/test';

test('test1', async({page})=>{
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

//skip
test.skip('test2', async({page})=>{
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

//skip with condition
test('test3', async({page, browserName})=>{
    //adding condition to skip the test if browser is firefox
    test.skip(browserName ==='firefox', 'skip if browser is firefox'); 
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

//fail
test.fail('test4', async({page})=>{
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

// fixme
test.fixme("test5",async({page})=>{
    await page.goto('https://www.google.com/');
    // No assertions added for this test case, so marking it as fixme
})

// slow
test("test6", async({page})=>{
    test.slow();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})


