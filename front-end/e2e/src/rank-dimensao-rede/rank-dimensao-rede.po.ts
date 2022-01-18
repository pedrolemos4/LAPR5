import { browser, by, element } from "protractor";

export class RankDimensaoRedePage {
    
    async navigateTo(){
        return browser.get('/rank_dimensao_rede');
    }

    getButton(){
        return element(by.id('submit'));
    }
}