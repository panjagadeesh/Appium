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

        // Enhanced actions for minute SeekBar
        await driver.performActions([
            {
                type: "pointer",
                id: "finger2",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: minuteLocation.x, y: minuteCenterY }, // Start position
                    { type: "pointerDown", button: 0 }, // Simulate press
                    { type: "pointerMove", duration: 1500, x: minuteTargetX, y: minuteCenterY }, // Move
                    { type: "pointerUp", button: 0 }, // Release
                ],
            },
        ]);

    } catch (error) {
        console.error("Error setting SeekBar:", error.message);
    }
};
