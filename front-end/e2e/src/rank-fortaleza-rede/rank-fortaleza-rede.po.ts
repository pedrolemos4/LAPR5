import { browser, by, element } from "protractor";

export class RankFortalezaRedePage {
    
    async navigateTo(){
        return browser.get('/rank_fortaleza_rede');
    }

    getButton(){
        return element(by.id('submit'));
    }
}