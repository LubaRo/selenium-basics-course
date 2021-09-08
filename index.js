import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/file_input.html';

        await driver.get(url);

        await driver.findElement(By.css('input[name="firstname"]')).sendKeys('John');
        await driver.findElement(By.css('input[name="lastname"]')).sendKeys('Doe');
        await driver.findElement(By.css('input[name="email"]')).sendKeys('jdoe@mail.com');

        const filePath = getFixturePath('file.txt');
        await driver.findElement(By.id('file')).sendKeys(filePath);

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