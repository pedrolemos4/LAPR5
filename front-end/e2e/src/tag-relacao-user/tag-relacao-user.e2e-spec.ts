import { browser } from 'protractor';
import { TagRelacaoUserPage } from './tag-relacao-user.po';

describe('Tag Relacao User tests', () => {
    let page: TagRelacaoUserPage;
    
    beforeEach(() => {
        page = new TagRelacaoUserPage();
    });

    it('Should Get Tag Cloud Relacao User', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})