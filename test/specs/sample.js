
import { clickModuleByDescription } from '../../Support/commonFunctions'
import { waitForElement } from '../../Support/commonFunctions'
import { tapElement } from '../../Support/commonFunctions'
import { setSeekBarTime } from '../../Support/commonFunctions'

describe('webdrieverio appium', () => {
    it('Craete Ar request', async () => {

        try {
            // const skip = await waitForElement('android=new UiSelector().className("android.widget.Button")');
            // await skip.click();
            // console.log('dddddddddddddd')

            const inputField = await waitForElement('android=new UiSelector().className("android.widget.EditText")');
            await inputField.click();
            await inputField.setValue('testgcp');
            await driver.hideKeyboard()
            // Find the button by XPath and click it
            const dddd = await driver.$('//android.widget.Button[@content-desc="Continue"]');
            await dddd.click();
            const EMP_id = await waitForElement('android=new UiSelector().className("android.widget.EditText").instance(0)');
            await EMP_id.click();
            await EMP_id.setValue('00000001');
            const Password = await waitForElement('android=new UiSelector().className("android.widget.EditText").instance(1)');
            await Password.click();
            await Password.setValue('Master@1234');
            await driver.hideKeyboard();
            const continueButton = await waitForElement('android=new UiSelector().description("Continue")');
            await continueButton.click();

            const Modules = await waitForElement('android=new UiSelector().description("Tab 2 of 3")');
            await Modules.click();

            const description = "ATTENDANCE";
            await clickModuleByDescription(description, waitForElement);

            let homescreen = "Attendance Logs"
            const pageLoadedSelector = `android=new UiSelector().description("${homescreen}")`;
            await waitForElement(pageLoadedSelector);
            // navigate the sub screen based on given index value
            const xpathPattern = `//android.widget.ImageView[@index='{index}']`;
            const index = 1;
            await tapElement(xpathPattern, index);
            let applyscreen = "Apply"
            const applied = `android=new UiSelector().description("${applyscreen}")`;

            await waitForElement(applied);
            const datepicker = await waitForElement('android=new UiSelector().className("android.widget.ImageView").instance(1)');
            await datepicker.click();
            const xpathdate = `//android.view.View[@index='{index}']`;
            const date = 8
                ;
            await tapElement(xpathdate, date);
            const confirm = await waitForElement('android=new UiSelector().description("Confirm")');
            await confirm.click()

            const add =  await driver.$('//android.widget.Button[@content-desc="Add"]');
            await add.click()
            const addpunch =  await driver.$('//android.widget.Button[@content-desc="Add Time"]');
            await addpunch.click()
            // const add1 =  await driver.$('//android.widget.Button[@content-desc="Add"]');
            // await add1.click()
            // const addpunch1 =  await driver.$('//android.widget.Button[@content-desc="Add Time"]');
            // await addpunch1.click()
            await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()');

            const reason = await driver.$('//android.widget.EditText');
            await reason.click()
            await reason.setValue('appium implementation')

            await driver.hideKeyboard();
            const sumbit = await driver.$('//android.widget.Button[@content-desc="Submit"]');
            await sumbit.click()
            const ARconfirm = await driver.$('//android.widget.Button[@content-desc="Confirm"]')
            await ARconfirm.click()
            
            
            const cross = await waitForElement('android=new UiSelector().className("android.widget.ImageView").instance(0)');
            await cross.click()


        }
        catch (error) {
            console.error(`locatr is no found: ${error.message}`);
        }

    });
});
