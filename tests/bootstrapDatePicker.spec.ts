import{test, expect, Locator, Page} from'@playwright/test';

test("bootstrap date picker", async({page})=>{

    await page.goto('https://www.booking.com/?chal_t=1780118534866&force_referer=')
    await page.getByTestId('searchbox-dates-container').click();

    // for checking in date

    let year ='2026';
    let month ='June';
    let date = '23';

    while(true){
        const checkinmonthyear:string = await page.locator('.d7bd90e008 h3').nth(0).innerText();
        const checkinmonth = checkinmonthyear.split(" ")[0];
        const checkinyear = checkinmonthyear.split(" ")[1];

        if(checkinmonth === month && checkinyear === year){
            break;

        }
        else{
            await page.locator('button[aria-label="Next month"]').click();
        }
    }

    const checkindate = await page.locator('.b8fcb0c66a tbody').nth(0).locator('td').all();
    let checkindateSelected = false;
    for(const dt of checkindate){
        const dateVal= await dt.innerText();
        if(dateVal === date){
            await dt.click();
            checkindateSelected = true;
            break;

        }
    }
    await expect(checkindateSelected).toBeTruthy();

    // for checking out date
    let checkoutyear ='2026';
    let checkoutmonth ='July';
    let checkoutdate = '30';

    while(true){
        const checkinmonthyear:string = await page.locator('.d7bd90e008 h3').nth(1).innerText();
        const checkoutmonthval = checkinmonthyear.split(" ")[0];
        const checkoutyearval = checkinmonthyear.split(" ")[1];

        if(checkoutmonthval === checkoutmonth && checkoutyearval === checkoutyear){
            break;

        }
        else{
        await page.locator('button[aria-label="Next month"]').click();
    }
        
    }

    const checkoutdateloc = await page.locator('.b8fcb0c66a tbody').nth(1).locator('td').all();
    let checkoutdateSelected = false;
    for(const dt of checkoutdateloc){
        const dateVal= await dt.innerText();
        if(dateVal === checkoutdate){
            await dt.click();
            checkoutdateSelected = true;
            break;

        }
    }
    await expect(checkoutdateSelected).toBeTruthy();
    await page.waitForTimeout(3000);


})
