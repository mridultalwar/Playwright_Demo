import {test, expect, Locator} from "@playwright/test";

test.only("test Input Actions", async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

     //                 text /input Box/ text Box

    const firstName:Locator = page.locator("#name");
    await expect(firstName).toBeVisible();

    // validating attribute value
    const maxLength:string | null = await firstName.getAttribute("maxlength");
    expect(maxLength).toBe("15");

    // valdating the content passing is same to the texxt field 
    await firstName.fill("Mridul Talwar");
    const firstNameValue:string = await firstName.inputValue();
    console.log(firstNameValue);
    expect(firstNameValue).toMatch(/mridul talwar/i);



})
//                     Radio buttons

    test("radio button", async ({page})=>{
         await page.goto("https://testautomationpractice.blogspot.com/");

        const maleRadio:Locator = page.locator("#male");
        await expect(maleRadio).toBeVisible();
        await expect(maleRadio).toBeEnabled();
        expect(await maleRadio.isChecked()).toBe(false);

        await maleRadio.check();
        expect(await maleRadio.isChecked()).toBe(true);
        await expect(maleRadio).toBeChecked();

        
    })

    //                     checkboxes

    test("CheckBoxes", async ({page})=>{
         await page.goto("https://testautomationpractice.blogspot.com");
        

        // checking single checkbox
        const checkBox:Locator = page.getByLabel("Sunday");
        await expect(checkBox).toBeVisible();
        await expect(checkBox).toBeEnabled();
        expect(await checkBox.isChecked()).toBe(false);

        await checkBox.check();
        expect(await checkBox.isChecked()).toBe(true);
        await expect(checkBox).toBeChecked();


        // checking multiple checboxes
        const days:string[] =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const checkBoxes:Locator[]= days.map(i => page.getByLabel(i));
        expect (checkBoxes).toHaveLength(7);

        for(const  cBox of checkBoxes){
            await cBox.check();
            await expect(cBox).toBeChecked();
        }

        // want to uncheck last 3 checboxes
        for(const ucBox of checkBoxes.slice(-3)){
            await ucBox.uncheck();
            await expect(ucBox).not.toBeChecked();

        }

        // toggle checkboxes: unchecked ==> checked: checked==>unchecked
        for(const toggle of checkBoxes){

            if(await toggle.isChecked()){ // true

            await toggle.uncheck();
            await expect(toggle).not.toBeChecked();

            }

            else{
                
            await toggle.check();
            await expect(toggle).toBeChecked();
        
            }

        }

        // when need to check random checkboxes

        const randCheck:number[] =[1,3,4];
        for(let j of randCheck){
            await checkBoxes[j].check();
            await expect(checkBoxes[j]).toBeChecked();
        }

        // want to select based on the label
        const label:string ="Satuday";
        for( const day of days){
            if(day.toLowerCase() === label.toLowerCase()){
                const finalRes:Locator= page.getByLabel(day);
                await finalRes.uncheck();
                await expect(finalRes).not.toBeChecked();
                
            }
        }


        
    })