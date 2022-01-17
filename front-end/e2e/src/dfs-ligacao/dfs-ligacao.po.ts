import { browser, by, element } from "protractor";

export class DfsLigacaoPage {
    
    async navigateTo(){
        return browser.get('/dfs_ligacao');
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