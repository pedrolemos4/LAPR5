import { browser, by, element } from "protractor";

export class AlgoritmoLigacaoRelacaoPage {
    
    async navigateTo(){
        return browser.get('/algoritmo_relacao_ligacao');
    }

    getSelector(){
        return element(by.id('amigos'));
    }

    getEstadoCheckbox(){
        return element(by.id('estado'));
    }

    getNivelTextbox(){
        return element(by.id('numeroNiveis'));
    }

    getButton(){
        return element(by.id('submit'));
    }
}