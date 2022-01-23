import { browser } from 'protractor';
import { SugerirAmigosPage } from './sugerir_amigos.po';

describe('Sugerir Amigos tests', () => {
    let page: SugerirAmigosPage;
    
    beforeEach(() => {
        page = new SugerirAmigosPage();
    });

    it('Should Get Player List', async () => {
        await page.navigateTo();
        await page.getNivelTextbox().sendKeys('2');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Player List - Invalid Number", async () => {
        await page.navigateTo();
        await page.getNivelTextbox().sendKeys('0');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Player List - No Number Entered", async () => {
        await page.navigateTo();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})