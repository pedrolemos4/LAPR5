import { browser } from 'protractor';
import { PedidoPage } from './pedido.po';

describe('Pedido tests', () => {
    let page: PedidoPage;
    
    beforeEach(() => {
        page = new PedidoPage(); 
    });

    it('Should Not Find Pedidos', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})