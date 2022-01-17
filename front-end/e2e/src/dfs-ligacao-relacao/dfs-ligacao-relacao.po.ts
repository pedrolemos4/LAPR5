import { browser, by, element } from "protractor";

export class DfsLigacaoRelacaoPage {
    
    async navigateTo(){
        return browser.get('/dfs_ligacao_relacao');
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