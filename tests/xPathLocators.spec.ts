import {test, expect, Locator} from "@playwright/test";

test("xpath Demo in playwright", async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");

    // Absolute xpath
    const absoluteXpath:Locator = page.locator("//html/body/div[4]/div[1]/div[4]/div[3]/div/div/div[1]/div[1]/img");
    await expect(absoluteXpath).toBeVisible();

    // relative Xpath
    const relativeXpath:Locator = page.locator("//*[@id='nivo-slider']/img");
    await expect(relativeXpath).toBeVisible();

    //Using contains and starts-with
    const product:Locator= page.locator("//div/a[contains(@href,'computer')]/img");
    expect(await product.count()).toBeGreaterThan(0);

    //Or
    const products:Locator= page.locator("//h2/a[contains(@href,'computer')]");
    const productCount:number = await products.count();
    console.log("computer related products: "+productCount);
    expect(productCount).toBeGreaterThan(0);

    // having multiple values for an xpatha dn want to extract any random then 

    // console.log("first product:"+ await products.textContent()); throws strict mode voilation

    console.log("first product:"+ await products.first().textContent());
    console.log("last product:"+ await products.last().textContent());
    console.log("nth product:"+ await products.nth(3).textContent());

    // if want print the textcontent for multiple elements which is more 
    let productsTitles:string[]= await products.allTextContents();

    console.log("all the title of the computer list: "+productsTitles); // will return titles in array 
    for(let pt of productsTitles){
        console.log(pt);  // will return all the titles
    }


    // starts-with()
    const buildProducts:Locator = page.locator("//h2/a[starts-with(@href,'/build')]");
    const buildProductsCount:number= await buildProducts.count();

    expect(buildProductsCount).toBeGreaterThan(0);


    // using text() or normaliza-space()
    const textValue:Locator = page.locator("//*[text()='Register']");
    await expect(textValue).toBeVisible();


    //using last() or position()= 1 or 2 or 3

    const LastValue:Locator = page.locator("//div[@class='column follow-us']//li[last()]");
    await expect(LastValue).toBeVisible();
    console.log("text content for last value: "+await LastValue.textContent());

    const positionValue:Locator = page.locator("//div[@class='column follow-us']//li[position()=2]")
    await expect(positionValue).toBeVisible();
    console.log("text content for Position value: "+await positionValue.textContent());
})