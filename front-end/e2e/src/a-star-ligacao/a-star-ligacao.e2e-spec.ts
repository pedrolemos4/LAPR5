import { browser } from 'protractor';
import { AStarLigacaoPage } from './a-star-ligacao.po';

describe('AStar Ligacao tests', () => {
    let page: AStarLigacaoPage;
    
    beforeEach(() => {
        page = new AStarLigacaoPage(); 
    });

    it('Should Find Caminhos - Estado Considerado', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getNivelTextbox().sendKeys(3);
        await page.getEstadoCheckbox().click();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Find Caminhos - Estado Não Considerado', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getNivelTextbox().sendKeys(3);
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
        await page.getNivelTextbox().sendKeys(3);
        await page.getEstadoCheckbox().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})