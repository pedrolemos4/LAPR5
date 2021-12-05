import { browser } from 'protractor';
import { CamSeguroPage } from './cam-seguro.po';

describe('CamSeguro tests', () => {
    let page: CamSeguroPage;
    
    beforeEach(() => {
        page = new CamSeguroPage(); 
    });

    it('Should Not Find Caminhos - Com Forca', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getForcaTextBox().sendKeys(3);
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Find Caminhos - Sem Forca', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getForcaTextBox().sendKeys();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})