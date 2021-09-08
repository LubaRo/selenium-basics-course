import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select_multiple';

        await driver.get(url);

        const iframeElem = await driver.findElement(By.id('iframeResult'))
        await driver.switchTo().frame(iframeElem);
        const selectCar = await driver.findElement(By.id('cars'));
        await selectCar.findElement(By.css('option[value="volvo"]')).click();
        await selectCar.findElement(By.css('option[value="audi"]')).click();


        await driver.findElement(By.css('input[type="submit"]')).click();
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