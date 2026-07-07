import {test, expect, Locator, Page} from '@playwright/test';

test("Jquery Date Picker", async ({page})=>{


    await page.goto('https://testautomationpractice.blogspot.com/');
    const datepicker:Locator = page.locator('//*[@id="datepicker"]');

    // 1st Approach
    await datepicker.click();
    // await datepicker.fill('10/12/2002');
    // await page.waitForTimeout(3000);


    // 2nd Approach
    await page.locator('#ui-datepicker-div').waitFor({state:'visible'});

    const month = 'August';
    const year = '2028';
    const date = '13';

    while(true){
        
        const monthSelection: string | null = await page.locator('.ui-datepicker-month').textContent();
        const yearSelection: string | null = await page.locator('.ui-datepicker-year').textContent();

        if(month === monthSelection && year === yearSelection){
            break;
        }
        // past value
        // else{
        //     await page.locator('.ui-datepicker-prev').click();
        // }

        //future
         else{
            await page.locator('.ui-datepicker-next').click();
        }
    }

    const dateSelection = await page.locator('.ui-datepicker-calendar tr td').all();
    for(const dt of dateSelection){
        const dateValue:string = await dt.innerText();
        if(dateValue === date){
            await dt.click();
            break;
        }
    }


})

async function datePickerSelction(year:string, month:string, date:string, page:Page, isFuture:boolean){

     while(true){
        
        const monthSelection: string | null = await page.locator('.ui-datepicker-month').textContent();
        const yearSelection: string | null = await page.locator('.ui-datepicker-year').textContent();
         // added to wait for older date get selected 

        if(month === monthSelection && year === yearSelection){
            break;
        }
        if(isFuture){

           await page.locator('.ui-datepicker-next').click() // future 
        }
         else{
            const value =await page.locator('.ui-datepicker-prev').click(); // Past
        }
    
    }

    const dateSelection = await page.locator('.ui-datepicker-calendar tr td').all();
    for(const dt of dateSelection){
        const dateValue:string = await dt.innerText();
        if(dateValue === date){
            await dt.click();
            break;
        }
    }

}

// use to select past or future value based on the req and used fucnction

test("jquery date picker with function", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.setDefaultTimeout(60000);
    const datepicker:Locator = page.locator('//*[@id="datepicker"]');
    await datepicker.click();
    await page.locator('#ui-datepicker-div').waitFor({state:'visible'});

    const month = 'January';
    const year = '2001';
    const date = '13';
    // for future date value is true and for past value should be false
    await datePickerSelction(year, month, date, page, false);

    //asseertion
    const expectedvalue:string = '01/13/2001';
    await expect(datepicker).toHaveValue(expectedvalue);
    

})

async function selectDate(year:string, month:string, date:string, page:Page){

     while(true){
        
        const monthSelection:Locator= page.locator('.ui-datepicker-month');
        const yearSelection:Locator = page.locator('.ui-datepicker-year');

        if(month === await monthSelection.textContent() && year === await yearSelection.textContent()){
            break;
        }
        else{

            await monthSelection.click();
            await monthSelection.selectOption({ label: month });
            await yearSelection.click();
            await yearSelection.selectOption({ label: year });

            break;
        }
    
    }

    const dateSelection = await page.locator('.ui-datepicker-calendar tr td').all();
    for(const dt of dateSelection){
        const dateValue:string = await dt.innerText();
        if(dateValue === date){
            await dt.click();
            break;
        }
    }

}

// use to select value by label

test.only("jquery date picker with function from dropdown", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
     // added to wait for older date get selected 
    await page.setDefaultTimeout(60000);
    const datepicker:Locator = page.locator('input[name=SelectedDate]');
    await datepicker.click();
    await page.locator('#ui-datepicker-div').waitFor({state:'visible'});

    const month = 'Jan';
    const year = '2018';
    const date = '13';
    // for future date value is true and for past value should be false
    await selectDate(year, month, date, page);

    //asseertion
    const expectedvalue:string = '13/01/2018';
    await expect(datepicker).toHaveValue(expectedvalue);
    

})