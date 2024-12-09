
import  {clickModuleByDescription} from '../../Support/commonFunctions'
import { waitForElement } from '../../Support/commonFunctions'

describe('Click an Android Button', () => {
    it('should click a button identified by the class name and handle dynamic screen loading', async () => {
        try {

            const skip = await waitForElement('android=new UiSelector().className("android.widget.Button")');
            await skip.click();
            console.log('dddddddddddddd')

            const inputField = await waitForElement('android=new UiSelector().className("android.widget.EditText")');
            await inputField.click();
            await inputField.setValue('uat');
            await driver.hideKeyboard()
           // Find the button by XPath and click it
            const dddd = await driver.$('//android.widget.Button[@content-desc="Continue"]');
            await dddd.click();
            const EMP_id = await waitForElement('android=new UiSelector().className("android.widget.EditText").instance(0)');
            await EMP_id.click();
            await EMP_id.setValue('PTR001');
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
            
            const xpath = '//android.widget.ImageView[@content-desc="Apply Right from regularization to shift group change, we’ve got it all here!"]';
 
            const element = await $(xpath);
        
            await element.waitForDisplayed({ timeout: 5000 });
            
            await element.click();
            
        } catch (error) {
            console.error(`locatr is no found: ${error.message}`);
        }
    });
});
