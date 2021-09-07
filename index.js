import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'

(async function example() {
    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        const url = 'http://suninjuly.github.io/registration1.html';

        await driver.get(url);

        const firstBlock = await driver.findElement(By.className('first_block'));
        await firstBlock.findElement(By.tagName('input')).sendKeys('Ivan')
        await firstBlock.findElement(By.className('second_class')).findElement(By.tagName('input')).sendKeys('Petrov')
        await firstBlock.findElement(By.className('third_class')).findElement(By.tagName('input')).sendKeys('some@mail.com')
        
        const secontBlock = await driver.findElement(By.className('second_block'));
        await secontBlock.findElement(By.className('first_class')).findElement(By.tagName('input')).sendKeys('8-3213-123')
        await secontBlock.findElement(By.className('second_class')).findElement(By.tagName('input')).sendKeys('address')

        const button = await driver.findElement(By.css('button.btn'))
        await button.click()
    }
    finally{
        driver.quit()
    }
})();

function getWebdriverAbsolutePath(driverType = 'chromedriver') {
    const projectRootDirPath = path.resolve('./');
    const webdriverDirPath = projectRootDirPath + '/webDrivers';
    return webdriverDirPath + '/' + driverType;
}