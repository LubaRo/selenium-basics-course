import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/simple_form_find_task.html';

        await driver.get(url);

        await driver.findElement(By.tagName('input')).sendKeys('Ivan')
        await driver.findElement(By.name('last_name')).sendKeys('Petrov')
        await driver.findElement(By.className('city')).sendKeys('Smolensk')
        await driver.findElement(By.id('country')).sendKeys('Smolensk')
        
        const button = await driver.findElement(By.css('button.btn'))
        await button.sendKeys('Russia')
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