import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/get_attribute.html';

        await driver.get(url);

        const varX = await driver.findElement(By.id('treasure')).getAttribute('valuex');
        const result = Math.log(Math.abs(12*Math.sin(Number(varX))));

        await driver.findElement(By.id('answer')).sendKeys(result.toString(10));
        await driver.findElement(By.id('robotCheckbox')).click();
        await driver.findElement(By.id('robotsRule')).click();

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