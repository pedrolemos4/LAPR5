import { browser, by, element } from "protractor";

export class BestFirstLigacaoPage {
    
    async navigateTo(){
        return browser.get('/bestfirst_ligacao');
    }

    getSelector(){
        return element(by.id('amigos'));
    }

    getNivelTextbox(){
        return element(by.id('numeroNiveis'));
    }

    getEstadoCheckbox(){
        return element(by.id('estado'));
    }

    getButton(){
        return element(by.id('submit'));
    }
}