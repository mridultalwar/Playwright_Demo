import {test, expect, Locator} from '@playwright/test';
 
test("static table validation", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForTimeout(3000);

    const row:Locator= page.locator("table[name='BookTable'] tr");
    
    // 1. row count
    const rowcount = await row.count();
    expect(rowcount).toBe(7);
    console.log("count is: ",rowcount);

    // 2. count number of columns/headers
    // const column:Locator = page.locator("table[name='BookTable'] tr th");  
    // or this is called chaining of locators
    const column:Locator = row.locator("th");
    await expect (column).toHaveCount(4);
    
    // 3. Read all the data from 2 row( index 2 means 3rd row including header)
    const secondrowcell:Locator = row.nth(2).locator("td");
    const secondrowcelltexts:string[] = await secondrowcell.allInnerTexts();
    console.log(secondrowcelltexts);
    await expect(secondrowcell).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

    // 4. reading all the data from the table
    console.log("printing all the data table values:......");

    const rows:Locator[] = await row.all();
    for(const tableValue of rows.slice(1)) // slice --> skipping header row
        {
        const cols = await tableValue.innerText();
        console.log(cols);
        // console.log(cols.join('\t')); // printing all the values without array
    }


    // printing book name whose author is Mukesh
    console.log("printing all the data table values:......");

    const mukeshBooks = [];
    for(const tableValue of rows.slice(1)) // slice --> skipping header row
        {
        const cols:string[] = await tableValue.locator('td').allInnerTexts();
        const book = cols[0];
        const author = cols[1];

        if(author === 'Mukesh'){
            console.log(`${author} \t ${book}`);
            mukeshBooks.push(book);
        }

    }
    expect(mukeshBooks).toHaveLength(2);


    // 6. total cost of all the books 
    console.log("printing all the data table values:......");

    let totalprice:number =0;
    for(const tableValue of rows.slice(1)) // slice --> skipping header row
        {
        const cols:string[] = await tableValue.locator('td').allInnerTexts();
        const price = cols[3];
        totalprice = totalprice+parseInt(price);
        }
        console.log("total price is: ",totalprice);

        expect(totalprice).toBe(7100);

})
