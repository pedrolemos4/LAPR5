import { browser } from 'protractor';
import { VerPerfilPage } from './ver-perfil.po';

describe('Tags Todos Jogadores tests', () => {
    let page: VerPerfilPage;
    
    beforeEach(() => {
        page = new VerPerfilPage();
    });

    it('Should Get Perfil', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})