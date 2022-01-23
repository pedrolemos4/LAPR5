import { browser, by, element } from "protractor";

export class PedirIntroducaoPage {
    
    async navigateTo(){
        return browser.get('/pedir_introducao');
    }

    getSelectorObjetivo() {
        return element(by.id('objetivo'));
    }
    getSelectorIntrodutor() {
        return element(by.id('introdutorio'));
    }

    getMensagemTextbox() {
        return element(by.id('mensagem'));
    }
    getButton(){
        return element(by.id('ligacaoIcon'));
    }
}