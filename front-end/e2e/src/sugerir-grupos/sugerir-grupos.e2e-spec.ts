import { browser } from 'protractor';
import { SugerirGruposPage } from './sugerir-grupos.po';

describe('Sugerir Grupos tests', () => {
    let page: SugerirGruposPage;
    
    beforeEach(() => {
        page = new SugerirGruposPage();
    });

    it('Should Get Groups', async () => {
        await page.navigateTo();
        await page.getUsersTextbox().sendKeys('2');
        await page.getTagsTextbox().sendKeys('musica');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Groups - Invalid Number", async () => {
        await page.navigateTo();
        await page.getUsersTextbox().sendKeys('asd');
        await page.getTagsTextbox().sendKeys('musica');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Groups - No Tags Entered", async () => {
        await page.navigateTo();
        await page.getButton().click();
        await page.getUsersTextbox().sendKeys('3');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Groups - No Users Entered", async () => {
        await page.navigateTo();
        await page.getButton().click();
        await page.getTagsTextbox().sendKeys('musica');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})