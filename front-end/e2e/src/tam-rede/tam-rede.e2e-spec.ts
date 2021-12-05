import { browser } from 'protractor';
import { TamRedePage } from './tam-rede.po';

describe('TamRede tests', () => {
    let page: TamRedePage;
    
    beforeEach(() => {
        page = new TamRedePage(); 
    });

    it('Should Find Caminhos', async () => {
        await page.navigateTo();
        await page.getNivelTextbox().sendKeys(3);
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Find Caminhos', async () => {
        await page.navigateTo();
        await page.getNivelTextbox().sendKeys();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})