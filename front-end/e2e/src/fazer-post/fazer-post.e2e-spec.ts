import { browser } from 'protractor';
import { FazerPostPage } from './fazer-post.po';

describe('Fazer Post tests', () => {
    let page: FazerPostPage;
    
    beforeEach(() => {
        page = new FazerPostPage();
    });

    it('Should Create Post', async () => {
        await page.navigateTo();
        await page.getPostTextbox().sendKeys('post teste');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Create Post - No Content", async () => {
        await page.navigateTo();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Create Post - Button Not Clicked", async () => {
        await page.navigateTo();
        await page.getPostTextbox().sendKeys('post teste');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})