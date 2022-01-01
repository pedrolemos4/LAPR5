import { browser } from 'protractor';
import { FeedPostsPage } from './feed-posts.po';

describe('Fazer Post tests', () => {
    let page: FeedPostsPage;
    
    beforeEach(() => {
        page = new FeedPostsPage();
    });

    it('Should Get Post Feed', async () => {
        await page.navigateTo();
        await page.getPlayerSelector().sendKeys('fiona@gmail.com');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Get Post Feed - No Player Selected", async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})