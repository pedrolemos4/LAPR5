import { browser } from 'protractor';
import { VerForcaRelacaoPage } from './ver-forca-relacao.po';

describe('Ver Forca Relacao tests', () => {
    let page: VerForcaRelacaoPage;
    
    beforeEach(() => {
        page = new VerForcaRelacaoPage();
    });

    it('Should Get Forcas Relacao', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})