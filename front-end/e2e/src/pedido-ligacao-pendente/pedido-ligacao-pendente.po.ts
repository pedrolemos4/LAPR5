import { browser, by, element } from "protractor";

export class PedidoLigacaoPendentePage {
    
    async navigateTo(){
        return browser.get('/pedido_ligacao_pendente');
    }

    getSelector(){
        return element(by.id('selector'));
    }
}