import {test, expect} from "playwright/test";

test("Screenshots demo",async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/login")
    
    const timestamp = Date.now();

    // //page screenshot
    // await page.screenshot({path:"screenshots/"+"pageScreenshot"+timestamp+".png"});

    // // full page screenshot
    // await page.screenshot({path:"screenshots/"+"fullPageScreenshots"+timestamp+".png",fullPage:true});

    // element screenshot
    await page.getByAltText("Tricentis Demo Web Shop").screenshot({path:"screenshots/"+"elementScreenshot"+timestamp+".png"});
}) 
test.only('Screenshots from config file', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginusername').press('Tab');
//   await page.locator('#loginpassword').fill('test@123');
  await page.locator('#loginpassword').fill('test@1231'); // Invalid pass
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#logout2')).toContainText('Log out');
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});
