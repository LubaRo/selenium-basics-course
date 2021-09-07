import {Builder, By, Key, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path'
//import firefox from 'selenium-webdriver/firefox.js';


(async function example() {
    //const serviceBuilder = new firefox.ServiceBuilder(getWebdriverAbsolutePath('geckodriver'));
    //let driver = await new Builder().forBrowser('firefox').setFirefoxService(serviceBuilder).build();

    chrome.setDefaultService(new chrome.ServiceBuilder(getWebdriverAbsolutePath()).build());
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to Url
        await driver.get('https://www.google.com');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

        let firstResult = await driver.wait(until.elementLocated(By.css('h3')), 50000);

        console.log(await firstResult.getAttribute('textContent'));
    }
    finally{
        driver.quit();
    }
})();

function getWebdriverAbsolutePath(driverType = 'chromedriver') {
    const projectRootDirPath = path.resolve('./');
    const webdriverDirPath = projectRootDirPath + '/webDrivers';
    return webdriverDirPath + '/' + driverType;
}