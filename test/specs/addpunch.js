import { clickModuleByDescription } from '../../Support/commonFunctions'
import { waitForElement } from '../../Support/commonFunctions'
import { tapElement } from '../../Support/commonFunctions'
import { setSeekBarTime } from '../../Support/commonFunctions'


describe('webdrieverio appium', () => {
    it('Craete Add_punch', async () => {

        const Modules = await waitForElement('android=new UiSelector().description("Tab 2 of 3")');
        await Modules.click();
        const description = "ATTENDANCE";
        await clickModuleByDescription(description, waitForElement);

        let homescreen = "Attendance Logs"
        const pageLoadedSelector = `android=new UiSelector().description("${homescreen}")`;
        await waitForElement(pageLoadedSelector);

        const checkin = await driver.$('//android.view.View[@content-desc="checkin"]')
        await checkin.click()
        const addpunch = await driver.$('//android.widget.ImageView[@content-desc="Tap here to add your punch"]')
        await addpunch.click()
        // new UiSelector().description("PUNCH INSERTED SUCCESSFULLY")
        let validate = "PUNCH INSERTED SUCCESSFULLY"
        const punchvalidate = `android=new UiSelector().description("${validate}")`;
        await waitForElement(punchvalidate);

});
});
