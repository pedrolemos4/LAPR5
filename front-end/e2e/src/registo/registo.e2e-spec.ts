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

    
})