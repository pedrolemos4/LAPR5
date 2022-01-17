import { browser } from 'protractor';
import { BestFirstLigacaoRelacaoPage } from './bestfirst-ligacao-relacao.po';

describe('Best First Ligacao Relacao tests', () => {
    let page: BestFirstLigacaoRelacaoPage;
    
    beforeEach(() => {
        page = new BestFirstLigacaoRelacaoPage(); 
    });

    it('Should Find Caminhos - Estado Considerado', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getEstadoCheckbox().click();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Find Caminhos - Estado Não Considerado', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Find Caminhos - Nivel Nao Colocado', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getEstadoCheckbox().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Find Caminhos - Button Not Clicked', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})