import { browser } from 'protractor';
import { RankFortalezaRedePage } from './rank-fortaleza-rede.po';

describe('Rank Fortaleza tests', () => {
    let page: RankFortalezaRedePage;
    
    beforeEach(() => {
        page = new RankFortalezaRedePage(); 
    });

    it('Should Get Rank Fortaleza', async () => {
        await page.navigateTo();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})