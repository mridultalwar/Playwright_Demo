import {test , expect , Locator} from "@playwright/test";

test("Xpath Path Axes Validation", async({page})=>{

    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1. Self xPath Axes (select <td> that comtains germany text)
    const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td"); // can remove /self::td as well 
    await expect(germanyCell).toHaveText(/germany/i);


    //2. parent xpath Axes(select parent <tr> of german cell)
    const parentRow:Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText("Maria Anders");
    //to verfiy all the row elements 
    console.log(await parentRow.textContent());
    await expect(parentRow).toContainText("Alfreds Futterkiste Maria Anders Germany");

    // child xpath Axes (get all <td> of second <tr> row element)
    const seccondRowCell:Locator = page.locator("//*[@id='customers']//tr[2]/child::td");
    expect(seccondRowCell).toHaveCount(3); 

    //ancestor -- Get Ancestor of <table> using germany Cell
    const ancestorCell:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(ancestorCell).toHaveAttribute("id","customers");
    console.log("Ancestors Working:");

    //descendant -- Get Descendant of <td> using table tag
    const descendantcell:Locator = page.locator("//*[@id='customers']/descendant::td");
    await expect(descendantcell).toHaveCount(18);
    console.log("Descendant Working:");

    // following -- Get <td> tags comes after the germany
    const followingCell:Locator = page.locator("//td[text()='Germany']/following::td");
    await expect(followingCell).toHaveCount(35);
    console.log("Followig working Fine");

    //Following-siblings -- Get <td> tags to the right of Germany
    const rightSiblings:Locator = page.locator("//td[text()='Germany']/following-sibling::td");
    await expect(rightSiblings).toHaveCount(0);
    console.log("Right sibling Working fine")


    //preceding -- Get <td> tags coomes before of germany 
    const precedingCell:Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    const value = await precedingCell.textContent();
    console.log(value);


    //preceding--siblings  --Get <td> tags comes left to the germany
    const leftSiblings:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(leftSiblings).toHaveCount(2);

    await expect(leftSiblings.nth(1)).toHaveText("Maria Anders");
    await expect(leftSiblings.nth(0)).toHaveText("Alfreds Futterkiste");
    
})
