export async function clickModuleByDescription(description, waitForElement) {
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

export const tapElement = async (xpathPattern, index) => {
    try {
        const xpath = xpathPattern.replace("{index}", index);
        await waitForElement(xpath);
        const element = await $(xpath);
        const { x, y } = await element.getLocation();
        const { width, height } = await element.getSize();

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: x + width / 2, y: y + height / 2 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        console.log(`Tap action on element with index ${index} performed successfully.`);
    } catch (error) {
        console.error(`Error performing tap on element with index ${index}:`, error);
    }
};
export const tapElementByContains = async (xpath) => {
    try {
        let element;
        let maxScrollAttempts = 5;
        let scrollAttempts = 0;

        console.log(`Starting to search for the element with XPath: "${xpath}"`);

        while (scrollAttempts < maxScrollAttempts) {
            console.log(`Attempt ${scrollAttempts + 1} to find the element`);
            element = await $(xpath);

            if (await element.isDisplayed()) {
                console.log(`Element found on attempt ${scrollAttempts + 1}`);
                break;
            }

            console.log(`Element not found. Scrolling down...`);
            await driver.execute('mobile: scrollGesture', {
                left: 100,
                top: 500,
                width: 200,
                height: 400,
                direction: 'down',
                percent: 1,
            });
            await driver.pause(1000)
            scrollAttempts++;
        }

        if (!element || !(await element.isDisplayed())) {
            throw new Error(`Element with XPath "${xpath}" not visible after ${maxScrollAttempts} scroll attempts`);
        }

        console.log(`Element found. Calculating its position to perform the tap.`);

        const { x, y } = await element.getLocation();
        const { width, height } = await element.getSize();
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        console.log(`Tapping on the element at position (${centerX}, ${centerY})`);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        console.log(`Successfully tapped the element with XPath "${xpath}"`);
    } catch (error) {
        console.error(`Failed to tap element: ${error.message}`);
    }
};



export const setTimePickerValue = async (driver, targetValue) => {
    try {
        const maxScrollAttempts = 10;
        let scrollAttempts = 0;

        console.log(`Starting to set time picker to value: ${targetValue}`);

        while (scrollAttempts < maxScrollAttempts) {
            console.log(`Attempt ${scrollAttempts + 1} to find and set the target value.`);

            const pickerElement = await driver.$(`//android.widget.SeekBar[@index='0']`);
            if (!(await pickerElement.isDisplayed())) {
                console.error("Time picker element is not visible.");
                throw new Error("Unable to interact with the time picker.");
            }
            console.log("Time picker element is visible.");

            const pickerLocation = await pickerElement.getLocation();
            const pickerSize = await pickerElement.getSize();
            console.log(`Picker Location: X=${pickerLocation.x}, Y=${pickerLocation.y}`);
            console.log(`Picker Size: Width=${pickerSize.width}, Height=${pickerSize.height}`);

            const currentValueElement = await driver.$(`//android.widget.SeekBar[@content-desc="${targetValue} o'clock"]`);
            if (await currentValueElement.isDisplayed()) {
                console.log(`Target value "${targetValue} o'clock" is visible on the picker.`);
                console.log("Exiting after successfully setting the target value.");
                return;
            }

            console.log(`Target value "${targetValue} o'clock" not visible. Dragging to find it.`);

            const startX = pickerLocation.x + pickerSize.width / 2;
            const startY = pickerLocation.y + pickerSize.height / 2;
            const endY = startY + pickerSize.height * 0.4; // Adjust drag distance as needed

            await driver.performActions([
                {
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: startX, y: startY },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pointerMove', duration: 1000, x: startX, y: endY },
                        { type: 'pointerUp', button: 0 },
                    ],
                },
            ]);

            console.log("Drag gesture executed. Pausing to let the UI settle.");
            await driver.pause(1000);

            scrollAttempts++;
            console.log(`Completed scroll attempt ${scrollAttempts}.`);
        }

        console.error(`Target value "${targetValue}" could not be found after ${maxScrollAttempts} attempts.`);
        throw new Error(`Target value "${targetValue}" not found after maximum scroll attempts.`);
    } catch (error) {
        console.error("Error encountered while handling the time picker:", error.message);
    }
};

