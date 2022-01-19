import { browser } from 'protractor';
import { VerAmigosGruposPage } from './ver-amigos-grupos.po';

describe('Ver Amigos Grupos tests', () => {
    let page: VerAmigosGruposPage;
    
    beforeEach(() => {
        page = new VerAmigosGruposPage();
    });

    it('Should Load Page', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get Amigos Comum', async () => {
        await page.navigateTo();
        await page.getAmigosComumBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get Amigos Sugeridos', async () => {
        await page.navigateTo();
        await page.getAmigosSugeridosBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get Grupos Sugeridos', async () => {
        await page.navigateTo();
        await page.getGruposSugeridosBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})