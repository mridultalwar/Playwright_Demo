import {test, expect, Locator} from '@playwright/test';

test("simple dialog", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    
    // dialog handler  
    page.on('dialog',async(dialogue)=>{
        console.log("dialog type:", dialogue.type());
        expect(dialogue.type()).toContain('alert');
        console.log("dialog message:", dialogue.message());
        await dialogue.accept();
    })

    // by default playwright dimissed the simple alert by its own if we dont wanna use dialog handler
    await page.locator('button[id="alertBtn"]').click();
   
})
test("confrimation dialog", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    
    // dialog handler  
    page.on('dialog',async(dialogue)=>{
        console.log("dialog type:", dialogue.type()); // return type of dialog
        expect(dialogue.type()).toContain('confirm');
        console.log("dialog message:", dialogue.message()); // return message of dialog
        expect(dialogue.message()).toBe('Press a button!'); 
        // when accept the alert
        // await dialogue.accept();
        // when dismiss the alert
       await dialogue.dismiss();
    })

    // by default playwright dimissed the simple alert by its own if we dont wanna use dialog handler
    await page.locator('button[id="confirmBtn"]').click(); // open the dialog pop up

    const text:string = await page.locator('#demo').innerText();
    console.log('dialog text: ', text);
    // accept message
    // expect(text).toBe('You pressed OK!'); // or await expect(page.locator(#demo)).toHaveText('You pressed OK!');
    // dismiss message
    expect(text).toBe('You pressed Cancel!');
   
})
test.only("prompt dialog", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    
    // dialog handler  
    page.on('dialog',async(dialogue)=>{
        console.log("dialog type:", dialogue.type()); // return type of dislog
        expect(dialogue.type()).toContain('prompt');
        console.log("dialog message:", dialogue.message()); // return message of dialog
        expect(dialogue.message()).toBe('Please enter your name:'); 
        expect(dialogue.defaultValue()).toBe('Harry Potter');
        await dialogue.accept('Mridul');
    })

    // by default playwright dimissed the simple alert by its own if we dont wanna use dialog handler
    await page.locator('button[id="promptBtn"]').click(); // open the dialog pop up
    await page.waitForTimeout(3000)


    const text:string = await page.locator('#demo').innerText();
    console.log('dialog text: ', text);
    
    expect(text).toBe('Hello Mridul! How are you today?');
   
   
})

