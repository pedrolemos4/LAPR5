import { browser } from 'protractor';
import { PedirIntroducaoPage } from './pedir-introducao.po';

describe('PedirIntroducao tests', () => {
    let page: PedirIntroducaoPage;
    
    beforeEach(() => {
        page = new PedirIntroducaoPage(); 
    });

    it('Should Pedir Introducao', async () => {
        await page.navigateTo();
        await page.getSelectorObjetivo().click();
        await page.getSelectorIntrodutor().click();
        await page.getMensagemTextbox().sendKeys('Mensagem');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Pedir Introducao', async () => {
        await page.navigateTo();
        await page.getSelectorObjetivo().click();
        await page.getSelectorIntrodutor().click();
        await page.getMensagemTextbox().sendKeys('');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Pedir Introducao - Button not clicked', async () => {
        await page.navigateTo();
        await page.getSelectorObjetivo().click();
        await page.getSelectorIntrodutor().click();
        await page.getMensagemTextbox().sendKeys('Mensagem');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})