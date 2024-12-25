
import { clickModuleByDescription } from '../../Support/commonFunctions'
import { waitForElement } from '../../Support/commonFunctions'
import { tapElementByContains } from '../../Support/commonFunctions'
import { setTimePickerValue } from '../../Support/commonFunctions'
import { tapElement } from '../../Support/commonFunctions'

describe('webdrieverio appium', () => {
    it('Craete Ar request', async () => {

        try {
            // const skip = await waitForElement('android=new UiSelector().className("android.widget.Button")');
            // await skip.click();
            // console.log('dddddddddddddd')

            const inputField = await waitForElement('android=new UiSelector().className("android.widget.EditText")');
            await inputField.click();
            await inputField.setValue('comics');
            await driver.hideKeyboard()
            const dddd = await driver.$('//android.widget.Button[@content-desc="Continue"]');
            await dddd.click();
            const EMP_id = await waitForElement('android=new UiSelector().className("android.widget.EditText").instance(0)');
            await EMP_id.click();
            await EMP_id.setValue('AKV0012');
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
            
            let xpathContainsValue = "Apply"
            const subvalue = `//android.widget.ImageView[contains(@content-desc, "${xpathContainsValue}")]`;
            await tapElementByContains(subvalue);

            let applyscreen = "Apply"
            const applied = `android=new UiSelector().description("${applyscreen}")`;

            await waitForElement(applied);
            const datepicker = await waitForElement('android=new UiSelector().className("android.widget.ImageView").instance(1)');
            await datepicker.click();

            const xpathdate = `//android.view.View[@index='{index}']`;
            const date = 8;
            await tapElement(xpathdate, date);
            const confirm = await waitForElement('android=new UiSelector().description("Confirm")');
            await confirm.click()

            const add = await driver.$('//android.widget.Button[@content-desc="Add"]');
            await add.click()

 
            await setTimePickerValue(driver, "6");

            
            const addpunch = await driver.$('//android.widget.Button[@content-desc="Add Time"]');
            await addpunch.click()
            
            const xpath = '//android.widget.EditText'
            console.log("reason111")
            await tapElementByContains(xpath);
            console.log("afterreason333")
            const Description = await waitForElement(xpath);

            await Description.setValue('appium implementation');

            await driver.hideKeyboard();

            const sumbit = await driver.$('//android.widget.Button[@content-desc="Submit"]');
            await sumbit.click()

            let sasa = "Submit Confirmation"
            const confirmscreen = `android=new UiSelector().description("${sasa}")`;

            await waitForElement(confirmscreen);

            const ARconfirm = await driver.$('//android.widget.Button[@content-desc="Confirm"]')
            await ARconfirm.click()

            let succesfull = "Submit Confirmation"
            const succes = `android=new UiSelector().description("${succesfull}")`;
            await waitForElement(succes);
            const cross = await waitForElement('android=new UiSelector().className("android.widget.ImageView").instance(0)');
            await cross.click()


        }
        catch (error) {
            console.error(`locatr is no found: ${error.message}`);
        }

    });
});
