import {test, expect} from '@playwright/test';

// Group 1
test.describe('Group1',async()=>{
test('Test1', async()=>{
    console.log('test1....');
});

test('Test2', async()=>{
    console.log('test2....');
});
})

// Group 2
test.describe('Group2',async()=>{

test('Test3', async()=>{
    console.log('test3....');
});

test('Test4', async()=>{
    console.log('test4....');
});
})