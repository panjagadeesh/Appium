describe('Click an Android Button', () => {
    it('should click a button identified by the class name', async () => {
        // Locate the button using its class name
        const skip = await $('android=new UiSelector().className("android.widget.Button")');
        await skip.waitForDisplayed({ timeout: 5000 });
        await skip.click();
        const inputField = await $('android=new UiSelector().className("android.widget.EditText")');
        await inputField.waitForDisplayed({ timeout: 10000 });
        await inputField.setValue('uat');
        const Org = await $('android=new UiSelector().className("android.widget.Button")');
        await Org.waitForDisplayed({ timeout: 5000 });
        await Org.click();
    });
});
