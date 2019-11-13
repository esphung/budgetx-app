const { reloadApp } = require('detox-expo-helpers');
// const { device } = require('detox');

describe('Home', () => {
  beforeEach(async () => {
    //await device.reloadReactNative();
    await reloadApp();
  });

  it('user can see screen', async () => {
    // await element(by.id('emailTextInput')).tap();
    await expect(element(by.id('test'))).toBeVisible();

  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
