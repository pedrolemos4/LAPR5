import { browser, by, element, protractor } from 'protractor';
import { PedirIntroducaoPage } from './pedir-introducao.po';

describe('PedirIntroducao tests', () => {
    let page: PedirIntroducaoPage;
    
    beforeEach(() => {
        page = new PedirIntroducaoPage(); 
    });

    it('Should Enter Page', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Pedir Introducao', async () => {
        await page.navigateTo();
        await page.getSelectorObjetivo().click();
        await page.getSelectorIntrodutor().click();
        const EC  = new protractor.ProtractorExpectedConditions();
        await browser.wait(EC.visibilityOf(element(by.id('mensagem'))), 30000, 'Element didnt load in 30 seconds');
        await page.getMensagemTextbox().sendKeys('Mensagem');
        await browser.wait(EC.elementToBeClickable(element(by.id('ligacaoIcon'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Pedir Introducao', async () => {
        await page.navigateTo();
        await page.getSelectorObjetivo().click();
        await page.getSelectorIntrodutor().click();
        const EC  = new protractor.ProtractorExpectedConditions();
        await browser.wait(EC.visibilityOf(element(by.id('mensagem'))), 30000, 'Element didnt load in 30 seconds');
        await page.getMensagemTextbox().sendKeys('');
        await browser.wait(EC.elementToBeClickable(element(by.id('ligacaoIcon'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Pedir Introducao - Button not clicked', async () => {
        await page.navigateTo();
        await page.getSelectorObjetivo().click();
        await page.getSelectorIntrodutor().click();
        const EC  = new protractor.ProtractorExpectedConditions();
        await browser.wait(EC.visibilityOf(element(by.id('mensagem'))), 30000, 'Element didnt load in 30 seconds');
        await page.getMensagemTextbox().sendKeys('Mensagem');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})