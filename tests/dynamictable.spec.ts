import {test, expect, Locator} from "@playwright/test";

test('verifying the dynamic table content', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForTimeout(3000);

    const table:Locator = await page.locator('table[id=taskTable] tbody');
    await expect(table).toBeVisible();

    //select all the rowss and find the number of rows
    const rowsCount:Locator[] = await table.locator('tr').all();
    console.log("rows count in a tbale is : ", rowsCount.length);
    expect(rowsCount).toHaveLength(4);

    // for chrome process get the value CPU load
    // read each row and check chrome presence
    let cpuload ='';
    for(const rows of rowsCount){

        const processName:string = await rows.locator('td').nth(0).innerText();
        if(processName.toLowerCase() ==='chrome'){
            cpuload = await rows.locator('td:has-text("%")').innerText();
            // OR
            // const cpuload = await rows.locator('td',{hasText:'%'}).innerText();
            console.log("CPU Load of Chrome ", cpuload);
            break;
            
        }
    }
    // doing assertion to check the cpuload value and cpu chrome value coming after the table 
    const finalvalue:string = await page.locator('div #displayValues p').nth(0).innerText();
    if(finalvalue.includes(cpuload)){
        console.log("CPU load values are equal");
    }
    else{
        console.log("CPU load values are not equal");
    }
    expect(finalvalue).toContain(cpuload);
})