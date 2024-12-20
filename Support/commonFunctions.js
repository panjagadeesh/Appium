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




export const setSeekBarTime = async (driver, hour, minute) => {
    if (hour < 1 || hour > 12) {
        throw new Error("Hour must be between 1 and 12");
    }
    if (minute < 0 || minute > 59) {
        throw new Error("Minute must be between 0 and 59");
    }

    try {
        const hourSeekBar = await driver.$(`//android.widget.SeekBar[@index='0']`);
        const minuteSeekBar = await driver.$(`//android.widget.SeekBar[@index='1']`);

        const hourLocation = await hourSeekBar.getLocation();
        const hourSize = await hourSeekBar.getSize();
        const hourTargetX = hourLocation.x + (hourSize.width * (hour - 1)) / 12;
        const hourCenterY = hourLocation.y + hourSize.height / 2;

        console.log(`Hour SeekBar X: ${hourLocation.x}, Target X: ${hourTargetX}`);

        // Enhanced actions for hour SeekBar
        await driver.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: hourLocation.x, y: hourCenterY }, // Start position
                    { type: "pointerDown", button: 0 }, // Simulate press
                    { type: "pointerMove", duration: 1500, x: hourTargetX, y: hourCenterY }, // Move
                    { type: "pointerUp", button: 0 }, // Release
                ],
            },
        ]);

        const minuteLocation = await minuteSeekBar.getLocation();
        const minuteSize = await minuteSeekBar.getSize();
        const minuteTargetX = minuteLocation.x + (minuteSize.width * minute) / 60;
        const minuteCenterY = minuteLocation.y + minuteSize.height / 2;

        console.log(`Minute SeekBar X: ${minuteLocation.x}, Target X: ${minuteTargetX}`);


        await driver.performActions([
            {
                type: "pointer",
                id: "finger2",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: minuteLocation.x, y: minuteCenterY },
                    { type: "pointerDown", button: 0 },
                    { type: "pointerMove", duration: 1500, x: minuteTargetX, y: minuteCenterY }, // Move
                    { type: "pointerUp", button: 0 }, // Release
                ],
            },
        ]);

    } catch (error) {
        console.error("Error setting SeekBar:", error.message);
    }
};
