import {test, expect, Locator} from "@playwright/test";

test("verify the auto suggestion dropdown values", async({page})=>{

    await page.goto("https://www.flipkart.com/");
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: '✕' }).click();
    
    const searchBox = page.getByPlaceholder("Search for Products, Brands and More").first();
    await expect(searchBox).toBeVisible();
    
    await searchBox.fill("smart"); // entering value

    // applying timeout because sometimes during run time data take time to load as it is coming from server
    await page.waitForTimeout(3000);

    // storing all the options
    const options:Locator = page.locator("ul>li");

    // checking the count of the dynamic values of smart input
    const count= await options.count(); 
    console.log("count is:", count);

    // printing all the available options

    // printing single random value
    //  console.log("4th Value: ",await options.nth(4).innerText());
    console.log("4th Value: ",await options.nth(4).textContent());

    //  1st approach for printing all the values
    // const printingValues:string[] = await options.allTextContents();
    // for(let i of printingValues){
    //     console.log(i);
    // }

    // 2nd Approach for printing all the values
    for(let i=0; i<count; i++){
        console.log("printing all values: ",await options.nth(i).innerText());

    }

    // select/click the random value from the dynamic dropdown
     for(let i=0; i<count; i++){
      const text =  await options.nth(i).innerText();
        if(text.toLowerCase() === 'smartphone'){
            const selectValue = options.nth(i);
            await selectValue.waitFor({state:'visible'});
            await selectValue.click();
            break;
        }

    }


})