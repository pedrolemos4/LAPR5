import { browser, by, element } from "protractor";

export class PedidoPage {
    
    async navigateTo(){
        return browser.get('/pedido');
    }

    getButtonAceitar(){
        return element(by.id('aceitar'));
    }

    getButtonRejeitar(){
        return element(by.id('rejeitar'));
    }
}