import {test, expect, Locator} from "@playwright/test";

test("verify playwright locator", async ({page}) =>{

    await page.goto("https://demo.nopcommerce.com/");

    // getByAltText
    const logo:Locator = page.getByAltText("Picture for category Digital downloads");
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toBeVisible();

    //getByText
    // await expect(page.getByText("Welcome to our store")).toBeVisible(); // full string
    // await expect(page.getByText("Welcome to ")).toBeVisible(); // substring 
    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible(); // regular expression (use to avoid uppercase or lowercase text)


    //getByRole
    await page.getByRole("link",{name:'Register'}).click();
    await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();

    //getByLabel
    await page.getByLabel('FirstName').fill("Mridul");
    await page.getByLabel('LastName').fill("Talwar");
    await page.getByLabel('Email').fill("mridul@gmail.com");

})