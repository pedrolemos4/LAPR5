import { browser } from 'protractor';
import { RegistoPage } from './registo.po';

describe('Registo tests', () => {
    let page: RegistoPage;
    
    beforeEach(() => {
        page = new RegistoPage(); 
    });

    it('Should Register', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Name Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Email Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Telefone Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys();
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Pais Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Cidade Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Data Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Estado Humor Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - Tags Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - PerfilFB Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('');
        await page.getPerfilLTextbox().sendKeys('anaPerfilL');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should not Register - PerfilL Missing', async () => {
        await page.navigateTo();
        await page.getNomeTextbox().sendKeys('Ana');
        await page.getEmailTextbox().sendKeys('ana@gmail.com');
        await page.getTelefoneTextbox().sendKeys(351698520569);
        await page.getPaisTextbox().sendKeys('en-PT');
        await page.getCidadeTextbox().sendKeys('Penafiel1');
        await page.getDataNascimentoTextbox().sendKeys('2000-12-12');
        await page.getEstadoHumorTextbox().sendKeys('Joyful');
        await page.getTagsTextbox().sendKeys('carros,moda');
        await page.getPerfilFbTextbox().sendKeys('anaPerfilFb');
        await page.getPerfilLTextbox().sendKeys('');
        //await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
    
})