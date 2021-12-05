import { browser } from 'protractor';
import { CamCurtoPage } from './cam-curto.po';

describe('CamCurto tests', () => {
    let page: CamCurtoPage;
    
    beforeEach(() => {
        page = new CamCurtoPage(); 
    });

    it('Should Not Find Caminhos', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})