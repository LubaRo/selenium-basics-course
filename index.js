import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'https://SunInJuly.github.io/execute_script.html';

        await driver.get(url);

        const value = + await driver.findElement(By.id('input_value')).getText();
        const result = Math.log(Math.abs(12*Math.sin(value)));

        const scrollScript = "return arguments[0].scrollIntoView();";

        await driver.findElement(By.id('answer')).sendKeys(result.toString(10));

        const checkboxInput = await driver.findElement(By.id('robotCheckbox'));
        await driver.executeScript(scrollScript, checkboxInput);
        await checkboxInput.click();

        const radioInput = await driver.findElement(By.id('robotsRule'));
        await driver.executeScript(scrollScript, radioInput);
        radioInput.click();

        const button = await driver.findElement(By.tagName('button'));
        await driver.executeScript(scrollScript, button);
        await button.click();
    }
    finally{
        await driver.sleep(5000);
        driver.quit()
    }
})();

function getWebdriverAbsolutePath(driverType = 'chromedriver') {
    const projectRootDirPath = path.resolve('./');
    const webdriverDirPath = projectRootDirPath + '/webDrivers';
    return webdriverDirPath + '/' + driverType;
}