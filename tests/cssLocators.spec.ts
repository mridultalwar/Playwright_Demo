import {test, expect, Locator} from '@playwright/test'
test("CSS Locator types",async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');

    // using tag#id

    await expect(page.locator("input#small-searchterms")).toBeVisible();
    await page.locator("input#small-searchterms").fill("T-shirts");

    // using tag.class

    await page.locator("input.search-box-text").clear();
    await page.locator("input.search-box-text").fill("blazzer");

    // using #id

    await page.locator("input.search-box-text").clear();
    await page.locator("#small-searchterms").fill("T-shirts");

    // using .class

    await page.locator("input.search-box-text").clear();
    await page.locator(".search-box-text").fill("blazzer");

    // using tag[attribute =value]==> use this one for both class and id

    //1.
    // await page.locator("input#small-searchterms[value='Search store']").clear();
    // await page.locator("input#small-searchterms[value='Search store']").fill("Kurta Pajama");

    //2.
    // await page.locator("input[value='Search store']").clear();
    // await page.locator("input[value='Search store']").fill("Kurta Pajama");

    //3.
    await page.locator("#small-searchterms[value='Search store']").clear();
    await page.locator("#small-searchterms[value='Search store']").fill("Kurta Pajama");

    // for CSS locators practice use link: https://testpages.eviltester.com/pages/basics/basic-web-page/
})