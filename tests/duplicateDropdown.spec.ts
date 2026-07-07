import {test, expect, Locator} from "@playwright/test";

test("verify the duplicacy in the list ", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const animalList:Locator = page.locator("#animals>option"); // no duplicacy
    const colorList:Locator = page.locator("#colors>option"); // having duplicacy

    const optionList:string[] = (await colorList.allTextContents()).map(i=> i.trim());

    const mySet = new Set<string>();
    const duplicacy:string[]=[];

    for(const text of optionList){

        if(mySet.has(text)){
            duplicacy.push(text);
        }
        else{
            mySet.add(text);
        }
    }
    console.log("duplicate characters are :",duplicacy);
    if(duplicacy.length>0){
        console.log("duplicate texts are available");
    }
    else{
        console.log("No duplicacy are found")
    }

})