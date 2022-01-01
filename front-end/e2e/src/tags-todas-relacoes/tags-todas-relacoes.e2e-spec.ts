import { browser } from 'protractor';
import { TagsTodasRelacoesPage } from './tags-todas-relacoes.po';

describe('Tags Todas Relacoes tests', () => {
    let page: TagsTodasRelacoesPage;
    
    beforeEach(() => {
        page = new TagsTodasRelacoesPage();
    });

    it('Should Get Tag Cloud Todas Relacoes', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})