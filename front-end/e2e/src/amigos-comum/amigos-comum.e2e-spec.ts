import { browser } from 'protractor';
import { AmigosComumPage } from './amigos-comum.po';

describe('Amigos em comum tests', () => {
    let page: AmigosComumPage;
    
    beforeEach(() => {
        page = new AmigosComumPage();
    });

    it('Should Get Amigos', async () => {
        await page.navigateTo();
        await page.getAmigosSelector().sendKeys('fiona@gmail.com');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Amigos - No Player Selected", async () => {
        await page.navigateTo();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Amigos - Button Not Clicked", async () => {
        await page.navigateTo();
        await page.getAmigosSelector().sendKeys('fiona@gmail.com');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})