// const { reloadApp } = require('detox-expo-helpers');

// describe('Example', () => {
//   beforeEach(async () => {
//     // await device.reloadReactNative();
//     await reloadApp();
//   });

//   it('should have welcome screen', async () => {
//     await expect(element(by.id('welcome'))).toBeVisible();
//   });

//   it('should show hello screen after tap', async () => {
//     await element(by.id('hello_button')).tap();
//     await expect(element(by.text('Hello!!!'))).toBeVisible();
//   });

//   it('should show world screen after tap', async () => {
//     await element(by.id('world_button')).tap();
//     await expect(element(by.text('World!!!'))).toBeVisible();
//   });
// });


const { reloadApp } = require('detox-expo-helpers');

describe('First tests', () => {
  beforeEach(async () => {
    await reloadApp();
  });
  
  it('Enter invalid email and submit', async () => {
    // expect(element(by.id('emailTextID')).toBeVisible());
    await element(by.id('UniqueId204')).tap();
    // await element(by.id('UniqueId204')).typeText('invalid email 123456789');
    // await element(by.label('return')).tap();

    // await element(by.id('sendButton')).tap();
    // await expect(element(by.id('messageText'))).toHaveText('');
    // await expect(element(by.label('New message'))).toBeVisible();
  });

  // it('Enter valid email and submit', async () => {
  //   await element(by.id('emailTextID')).tap();
  //   await element(by.id('emailTextID')).typeText('esphung@yahoo.com');
  //   await element(by.label('return')).tap();

  //   // await element(by.id('sendButton')).tap();
  //   // await expect(element(by.id('messageText'))).toHaveText('');
  //   // await expect(element(by.label('New message'))).toBeVisible();
  // });
});



// // ORIGINAL TEST EXAMPLE
// const { reloadApp } = require('detox-expo-helpers');

// describe('Creating a message', () => {
//   beforeEach(async () => {
//     await reloadApp();
//   });
  
//   it('should add the message to the list', async () => {
//     await element(by.id('messageText')).tap();
//     await element(by.id('messageText')).typeText('New message');
//     await element(by.id('sendButton')).tap();
//     await expect(element(by.id('messageText'))).toHaveText('');
//     await expect(element(by.label('New message'))).toBeVisible();
//   });
// });
