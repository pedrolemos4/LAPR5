import { browser } from 'protractor';
import { RedeNivelPage } from './rede_nivel.po';

describe('RedeNivel tests', () => {
    let page: RedeNivelPage;
    
    beforeEach(() => {
        page = new RedeNivelPage(); 
    });

    it('Should Load Rede', async () => {
        await page.navigateTo();
        await page.getNivelTextbox().sendKeys(2);
        await page.getBtnVerRede().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Load Rede', async () => {
        await page.navigateTo();
        await page.getNivelTextbox().sendKeys();
        await page.getBtnVerRede().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})