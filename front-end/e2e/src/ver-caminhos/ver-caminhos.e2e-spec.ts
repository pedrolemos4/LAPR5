import { browser } from 'protractor';
import { VerCaminhosPage } from './ver-caminhos.po';

describe('Ver Caminhos tests', () => {
    let page: VerCaminhosPage;
    
    beforeEach(() => {
        page = new VerCaminhosPage();
    });

    it('Should Get Caminhos', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})