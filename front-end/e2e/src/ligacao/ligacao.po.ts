import { browser, by, element } from "protractor";

export class LigacaoPage {
    
    async navigateTo(){
        return browser.get('/ligacao');
    }


    getParametroTextBox(){
        return element(by.id('parametro'));
    }

    getParametroEscolha(){
        return element(by.id('selector'));
    }

    getButtonPesquisa(){
        return element(by.id('pesquisa'));
    }

    getSelector(){
        return element(by.id('escolha'));
    }

    getButtonSend(){
        return element(by.id('send'));
    }

    getTextoLigacaoTextBox(){
        return element(by.id('ligacao'));
    }

    getButtonSubmit(){
        return element(by.id('ligacaoIcon'));
    }
}