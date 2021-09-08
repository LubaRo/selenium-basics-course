import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/redirect_accept.html';

        await driver.get(url);
        await driver.findElement(By.tagName('button')).click();

        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);

        const value = + await driver.findElement(By.id('input_value')).getText();
        const result = Math.log(Math.abs(12*Math.sin(value)));

        await driver.findElement(By.id('answer')).sendKeys(result);
        await driver.findElement(By.tagName('button')).click();
    }
    finally{
        await driver.sleep(5000);
        driver.quit()
    }
})();

function getFixturePath(fileName) {
    return getProjectRootDirPath() + '/fixtures/' + fileName;
}
function getProjectRootDirPath() {
    return path.resolve('./');
}
function getWebdriverAbsolutePath(driverType = 'chromedriver') {
    const webdriverDirPath = getProjectRootDirPath() + '/webDrivers';
    return webdriverDirPath + '/' + driverType;
}