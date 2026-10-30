/*

3 ways to create trace file in playwright(.zip):

    1) using playwright.config..ts
    2) using command
            npx playwright test mytest.spec.ts --trace on
    
    3) code{programatically} 
            context.tracing.start({ screenshots: true, snapshots: true });
            //statements
            
            context.tracing.stop({ path: 'trace.zip' });

3 ways to view trace file in playwright(.zip):
    1) from html file --- click on trace.zip file in report folder
    2) from command 
              npx playwright show-trace trace.zip

    3) using url 
            https://trace.playwright.dev/ -->(drag and drop/upload) trace.zip file


*/

import {test, expect} from "@playwright/test"

test('Tracing', async ({ context }, testInfo) => {
  const page = await context.newPage();  
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginusername').press('Tab');
  await page.locator('#loginpassword').fill('test@123');
//   await page.locator('#loginpassword').fill('test@1231'); // Invalid pass
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#logout2')).toContainText('Log out');
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});


test.only('Tracing using start and stop', async ({ context }) => {
  const page = await context.newPage();  
  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginusername').press('Tab');
  context.tracing.stop({ path:'trace.zip'});
  await page.locator('#loginpassword').fill('test@123');
//   await page.locator('#loginpassword').fill('test@1231'); // Invalid pass
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#logout2')).toContainText('Log out');
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});