import { browser } from 'protractor';
import { CamFortePage } from './cam-forte.po';

describe('CamForte tests', () => {
    let page: CamFortePage;
    
    beforeEach(() => {
        page = new CamFortePage(); 
    });

    it('Should Not Find Caminhos', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})