import { browser } from 'protractor';
import { PerfilPage } from './perfil.po';

describe('Perfil tests', () => {
    let page: PerfilPage;
    
    beforeEach(() => {
        page = new PerfilPage(); 
    });

    it('Should Update', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Martim');
        await page.getPaisTextbox().sendKeys('en-US');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Update', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('');
        await page.getPaisTextbox().sendKeys('');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Update: Button not clicked', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Martim');
        await page.getPaisTextbox().sendKeys('en-US');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})