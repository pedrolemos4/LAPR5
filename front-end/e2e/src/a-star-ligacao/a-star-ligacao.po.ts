import { browser, by, element } from "protractor";

export class AStarLigacaoPage {
    
    async navigateTo(){
        return browser.get('/a_star_ligacao');
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