import { browser } from 'protractor';
import { IntroducaoPage } from './introducao.po';

describe('Introducao tests', () => {
    let page: IntroducaoPage;
    
    beforeEach(() => {
        page = new IntroducaoPage(); 
    });

    it('Should Not Find Introducoes', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})