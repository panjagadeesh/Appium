export  async function clickModuleByDescription(description, waitForElement) {
    const formattedDescription = `${description.charAt(0).toUpperCase()}${description.slice(1).toLowerCase()}`;
  
    const selector = `android=new UiSelector().description("${formattedDescription}")`;
  
    const element = await waitForElement(selector);
    await element.click();
  }

  //web element recursion

 export const waitForElement = async (selector, timeout = 8000000, interval = 500) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const element = await $(selector);
        if (await element.isDisplayed()) {
            return element;
        }
        await browser.pause(interval);
    }
    throw new Error(`Element not displayed within ${timeout}ms: ${selector}`);
};


            