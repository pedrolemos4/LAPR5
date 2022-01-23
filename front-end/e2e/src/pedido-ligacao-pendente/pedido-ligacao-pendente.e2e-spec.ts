import { browser } from 'protractor';
import { PedidoLigacaoPendentePage } from './pedido-ligacao-pendente.po';

describe('Pedido Ligacao Pendente tests', () => {
    let page: PedidoLigacaoPendentePage;
    
    beforeEach(() => {
        page = new PedidoLigacaoPendentePage(); 
    });

    it('Should Find Pedidos', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})