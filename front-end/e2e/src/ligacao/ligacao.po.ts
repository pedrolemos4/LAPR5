import { browser, by, element } from "protractor";

export class LigacaoPage {
    
    async navigateTo(){
        return browser.get('/ligacao');
    }

    getButtonPeloNome(){
        return element(by.id('submit'));
    }
    getButtonPeloEmail(){
        return element(by.id('submit1'));
    }
    getButtonPeloPais(){
        return element(by.id('submit2'));
    }

    getParametroTextBox(){
        return element(by.id('parametro'));
    }

    getButtonPesquisa(){
        return element(by.id('botao'));
    }

    getSelector(){
        return element(by.id('escolha'));
    }

    getTextoLigacaoTextBox(){
        return element(by.id('ligacao'));
    }

    getButtonSubmit(){
        return element(by.id('submit4'));
    }
}