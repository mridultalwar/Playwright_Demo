import{test, expect, Locator} from "@playwright/test";

test('Single Select Dropdown', async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1. 4 ways to select value form dropdown
    // await page.locator("#country").selectOption('India'); // using text
    await page.locator("#country").selectOption({value:'india'});  // using value attribute
    // await page.locator("#country").selectOption({label:'India'});  // using label nothing but text
    // await page.locator("#country").selectOption({index:9}); // using index xvalue

    // 2. count of dropdown values
    const dropdownOptions:Locator = page.locator("#country>option");
    expect(dropdownOptions).toHaveCount(10);

    // 3. check an element is present in dropdown 
    const optionsText:string[] =await dropdownOptions.allTextContents();
    console.log(optionsText); // returning \n as well with the text 

    // to overcome the \n issue we can use map
    const newOptionstext:string[] = optionsText.map(text=>text.trim());
    console.log(newOptionstext);
    expect(newOptionstext).toContain("India");

    // 4. printing options form the dropdown
    for(const value of newOptionstext){
        console.log(value);
    }

    await page.waitForTimeout(5000);
})