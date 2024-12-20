import path from 'path';

export const config = {
    runner: 'local',
    hostname: 'localhost',
    port: 4724,
    specs: [
        './test/specs/sample.js',
        './test/specs/addpunch.js'

    ],

    maxInstances: 1,
    capabilities: [{
        "appium:automationName": "UiAutomator2",
        "appium:platformName": "Android",
        "appium:platformVersion": "8.1.0",
        "appium:deviceName": "Q4SGDUDQKNNVYHSS",
        "appium:appPackage": "com.akrv.hcm_v3",
        "appium:appActivity": "com.akrv.hcm_v3.MainActivity",
        "appium:noReset": true,          // Prefix added
        "appium:fullReset": false,
        'appium:app': path.join(process.cwd(),'app/android/HCM_Build3.7.9_release.apk'),
        "appium:autoGrantPermissions": true,
        "appium:autoAcceptAlerts": true,

    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    path: '/wd/hub',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 210000
    }
};
