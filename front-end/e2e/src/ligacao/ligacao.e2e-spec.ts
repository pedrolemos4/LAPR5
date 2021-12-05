import { browser } from 'protractor';
import { LigacaoPage } from './ligacao.po';

describe('Ligacao tests', () => {
    let page: LigacaoPage;
    
    beforeEach(() => {
        page = new LigacaoPage(); 
    });

    it('Pesquisa pelo Nome', async () => {
        await page.navigateTo();
        await page.getButtonPeloNome().click();
        await page.getParametroTextBox().sendKeys('Joaquim');
        await page.getTextoLigacaoTextBox().sendKeys('texto');
        await page.getSelector().click();
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Pesquisa pelo Email', async () => {
        await page.navigateTo();
        await page.getButtonPeloEmail().click();
        await page.getParametroTextBox().sendKeys('joaquim@gmail.com');
        await page.getTextoLigacaoTextBox().sendKeys('texto');
        await page.getSelector().click();
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Pesquisa pelo Pais', async () => {
        await page.navigateTo();
        await page.getButtonPeloEmail().click();
        await page.getParametroTextBox().sendKeys('en-PT');
        await page.getTextoLigacaoTextBox().sendKeys('texto');
        await page.getSelector().click();
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Pesquisa Inválida', async () => {
        await page.navigateTo();
        await page.getParametroTextBox().sendKeys('');
        await page.getTextoLigacaoTextBox().sendKeys('');
        await page.getSelector().click();
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})