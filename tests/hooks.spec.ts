import {test, expect} from '@playwright/test';

test.beforeAll('BeforeAll',async()=>{

        console.log('Before All....');
})

test.afterAll('AfterAll',async()=>{
    console.log('After All....');
})

test.beforeEach('Before Each',async()=>{
    console.log('Before Each....');
})

test.afterEach('After Each',async()=>{
    console.log('After Each....');
})

test('Test1', async()=>{
    console.log('test1....');
});

test('Test2', async()=>{
    console.log('test2....');
});

test('Test3', async()=>{
    console.log('test3....');
});

test('Test4', async()=>{
    console.log('test4....');
});
