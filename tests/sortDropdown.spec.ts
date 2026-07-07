import {test, expect, Locator} from "@playwright/test";

test("verify the dropdown that is sorted or not ", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const animalList:Locator = page.locator("#animals>option"); // sorted already
    const colorList:Locator = page.locator("#colors>option"); // un-sorted list

    const optionList:string[] = (await colorList.allTextContents()).map(index=> index.trim());
    const originalList:string[] = [...optionList];
    const sortedList:string[] = [...optionList].sort();

    console.log("original list:",originalList);
    console.log("Sorted List:", sortedList);

    // expect(originalList).toEqual(sortedList); // fail

})