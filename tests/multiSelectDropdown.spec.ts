import {test, expect, Locator} from "@playwright/test";

test("multi selector Dropdown", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. four ways to select multi values from the dropdwon

        // await page.locator("#colors").selectOption(['Red','Green','White']); // using textx value
        // await page.locator("#colors").selectOption([{value:'red'},{value:'green'}]); // using value attribute
        // await page.locator('#colors').selectOption([{label:'Yellow'},{label:'Green'}]); // using label which is text
        await page.locator("#colors").selectOption([{index:2}, {index:3}]); // using index
        
    //2. count of dropdown values

        const dropdownOptions:Locator = page.locator("#colors>option");
        await expect(dropdownOptions).toHaveCount(7);

    //3. check an element is present in dropdown
        
        const optionCheck:String[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());
        console.log(optionCheck);
        expect(optionCheck).toContain("Red");

    //4.  printing options fromm the dropdown

        for(let values of optionCheck){
            console.log(values);
        }
})  