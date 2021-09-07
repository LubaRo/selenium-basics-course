import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/huge_form.html';

        await driver.get(url);

        const elems = await driver.findElements(By.tagName('input'))

        for (const inputElem of elems) {
            await inputElem.sendKeys('txt..')
        }
        
        const button = await driver.findElement(By.css('button.btn'))
        await button.click()
    }
    finally{
        console.log('waiting 3 seconds and then - close browser.');
        setTimeout(() => driver.quit(), 30000);
    }
})();

function getWebdriverAbsolutePath(driverType = 'chromedriver') {
    const projectRootDirPath = path.resolve('./');
    const webdriverDirPath = projectRootDirPath + '/webDrivers';
    return webdriverDirPath + '/' + driverType;
}