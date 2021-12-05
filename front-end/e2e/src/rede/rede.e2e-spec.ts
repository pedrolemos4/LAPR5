import { browser } from 'protractor';
import { RedePage } from './rede.po';

describe('Rede tests', () => {
    let page: RedePage;
    
    beforeEach(() => {
        page = new RedePage(); 
    });

    it('Should Load Rede', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})