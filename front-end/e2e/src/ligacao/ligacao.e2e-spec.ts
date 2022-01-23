import { browser, by, element, protractor, until } from 'protractor';
import { LigacaoPage } from './ligacao.po';

describe('Ligacao tests', () => {
    let page: LigacaoPage;

    beforeEach(async () => {
        page = new LigacaoPage();});

    it('Pesquisa pelo Nome', async () => {
        await page.navigateTo();
        await page.getParametroEscolha().click();
        const EC  = new protractor.ProtractorExpectedConditions();
        await browser.wait(EC.visibilityOf(element(by.id('parametro'))), 30000, 'Element didnt load in 30 seconds');
        await page.getParametroTextBox().sendKeys('Joaquim');
        await browser.wait(EC.elementToBeClickable(element(by.id('pesquisa'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonPesquisa().click();
        await browser.wait(EC.elementToBeClickable(element(by.id('escolha'))), 30000, 'Element didnt load in 30 seconds');
        await page.getSelector().click();
        await browser.wait(EC.elementToBeClickable(element(by.id('send'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonSend().click();
        await browser.wait(EC.visibilityOf(element(by.id('ligacao'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTextoLigacaoTextBox().sendKeys('texto');
        await browser.wait(EC.elementToBeClickable(element(by.id('ligacaoIcon'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Pesquisa pelo Email', async () => {
        await page.navigateTo();
        await page.getParametroEscolha().click();
        const EC  = new protractor.ProtractorExpectedConditions();
        await browser.wait(EC.visibilityOf(element(by.id('parametro'))), 30000, 'Element didnt load in 30 seconds');
        await page.getParametroTextBox().sendKeys('joaquim@gmail.com');
        await browser.wait(EC.elementToBeClickable(element(by.id('pesquisa'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonPesquisa().click();
        await browser.wait(EC.elementToBeClickable(element(by.id('escolha'))), 30000, 'Element didnt load in 30 seconds');
        await page.getSelector().click();
        await browser.wait(EC.elementToBeClickable(element(by.id('send'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonSend().click();
        await browser.wait(EC.visibilityOf(element(by.id('ligacao'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTextoLigacaoTextBox().sendKeys('texto');
        await browser.wait(EC.elementToBeClickable(element(by.id('ligacaoIcon'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Pesquisa pelo Pais', async () => {
        await page.navigateTo();
        await page.getParametroEscolha().click();
        const EC  = new protractor.ProtractorExpectedConditions();
        await browser.wait(EC.visibilityOf(element(by.id('parametro'))), 30000, 'Element didnt load in 30 seconds');
        await page.getParametroTextBox().sendKeys('Portugal');
        await browser.wait(EC.elementToBeClickable(element(by.id('pesquisa'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonPesquisa().click();
        await browser.wait(EC.elementToBeClickable(element(by.id('escolha'))), 30000, 'Element didnt load in 30 seconds');
        await page.getSelector().click();
        await browser.wait(EC.elementToBeClickable(element(by.id('send'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonSend().click();
        await browser.wait(EC.visibilityOf(element(by.id('ligacao'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTextoLigacaoTextBox().sendKeys('texto');
        await browser.wait(EC.elementToBeClickable(element(by.id('ligacaoIcon'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButtonSubmit().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

})