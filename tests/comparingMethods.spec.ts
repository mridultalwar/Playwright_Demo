import {test, expect, Locator} from "@playwright/test";

test("Comparing Methods", async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
    await page.waitForTimeout(3000);

    const products:Locator = page.locator(".product-title");

    // 1. innerText and textContent

    // console.log(await products.nth(1).innerText()); // printing 14.1-inch Laptop
    // console.log(await products.nth(2).textContent()); // printing Build your own cheap computer with spaces

    const count = await products.count();

    for(let i=0; i<count; i++){
        // const productName = await products.nth(i).innerText();
        // console.log(productName); // extract plain text

        // const productName = await products.nth(i).textContent();
        // console.log(productName); // extract text including spaces and hidden elements

       const productName:null | string = await products.nth(i).textContent();
       console.log(productName?.trim());
    }

    // 2. allInnerText and allTextxContent 

    // const productNames:string[] = await products.allInnerTexts();
    // console.log(productNames);

    // const productNames:string[] = await products.allTextContents();
    // console.log(productNames);

    const productNames:string[] = (await products.allInnerTexts()).map(text => text.trim());
    console.log(productNames);

    // 3. all()
    const productLocator:Locator[] = await products.all();
    console.log(productLocator);

    console.log(await productLocator[0].innerText()) // to print value from the array locator

    // using for of loop
    for(const producLoc of productLocator){
        console.log(await producLoc.innerText());
    
    }

    // for in loop
    for(let i in productLocator){
        console.log(await productLocator[i].textContent());
    
    }

})