import { browser } from 'protractor';
import { RankDimensaoRedePage } from './rank-dimensao-rede.po';

describe('Rank Dimensao tests', () => {
    let page: RankDimensaoRedePage;
    
    beforeEach(() => {
        page = new RankDimensaoRedePage(); 
    });

    it('Should Get Rank Dimensao', async () => {
        await page.navigateTo();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})