import { browser, by, element } from "protractor";

export class VerPerfilPage {
    
    async navigateTo(){
        return browser.get('/ver_algoritmos');
    }

    getAStarLigRelBtn() {
        return element(by.id('aStarLigRel'));
    }

    getAStarLigBtn() {
        return element(by.id('aStarLig'));
    }

    getBestFirstLigRelBtn() {
        return element(by.id('bestFirstLigRel'));
    }

    getBestFirstLigBtn() {
        return element(by.id('bestFirstLig'));
    }

    getDFSLigRelBtn() {
        return element(by.id('dfsLigRel'));
    }

    getDFSLigBtn() {
        return element(by.id('dfsLig'));
    }
}