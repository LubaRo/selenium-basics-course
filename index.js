import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/selects2.html';

        await driver.get(url);

        const num1 = await driver.findElement(By.id('num1')).getText();
        const num2 = await driver.findElement(By.id('num2')).getText();

        await driver.findElement(By.id('dropdown')).sendKeys(Number(num1) + Number(num2));

        const button = await driver.findElement(By.css('button.btn[type="submit"]'));
        await button.click()
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