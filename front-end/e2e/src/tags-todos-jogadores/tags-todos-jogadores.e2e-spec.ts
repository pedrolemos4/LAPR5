import { browser } from 'protractor';
import { TagsTodosJogadoresPage } from './tags-todos-jogadores.po';

describe('Tags Todos Jogadores tests', () => {
    let page: TagsTodosJogadoresPage;
    
    beforeEach(() => {
        page = new TagsTodosJogadoresPage();
    });

    it('Should Get Tag Cloud Todos Jogadores', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})