import{test, expect, Locator} from '@playwright/test';

test.only('read data from all the table pages', async({page})=>{

    await page.goto('https://datatables.net/');

    let hasmorepages =true;

    while(hasmorepages){
        const rows:Locator[] = await page.locator('#example tbody tr').all();
        for(const row of rows){
            console.log(await row.innerText());
        }
        // const nextButton:Locator = await page.locator('button[aria-controls="example"]:has-text("›")');
        // or 
        const nextButton:Locator = await page.locator('button[aria-controls="example"]',{hasText:'›'});

        const isDisabled = await nextButton.getAttribute('class');

        if(isDisabled?.includes('disabled')){
            hasmorepages= false;

        }
        else{
            await nextButton.click();
        }
    }
})

test("Filter the rows and check the rows count", async({page})=>{
    
    await page.goto('https://datatables.net/');

    const dropdown:Locator = page.locator('#dt-length-0');
    await dropdown.selectOption({label:'50'});

    //Approach 1
    // const rows:Locator[] = await page.locator('#example tbody tr').all();
    // expect(rows.length).toBe(50);

    //Aprroach 2
    const rows:Locator = page.locator('#example tbody tr');
    await expect(rows).toHaveCount(50);

})

test("Search for specific data from the table",async({page})=>{

        await page.goto('https://datatables.net/');
        const searchbox:void = await page.locator('input#dt-search-0').fill('Paul Byrd');

        const rows:Locator[] = await page.locator('#example tbody tr').all();

        // first approach
        // if(rows.length>=1){

        //     let matchText = false;
        //     for(let row of rows){
        //         const rowname:string = await row.innerText();
        //         if(rowname.includes('Paul Byrd')){
        //             console.log('Data exists!! ')
        //             matchText = true;
        //         }

        //     }
        //     expect(matchText).toBe(true);
        //     // or
        //     expect(matchText).toBeTruthy();
        // }

        // seccond approach 
        if(rows.length>=1){

            let matchText = false;
            for(const row of rows){
                const name:string = (await row.locator('td').nth(0).innerText());
                console.log(name);

                if(name === 'Paul Byrd'){
                    console.log('Data Exists!!...');
                    matchText =true;
                }
            }
            expect(matchText).toBeTruthy();
        }
        else{
            console.log('no data found');
        }


})
