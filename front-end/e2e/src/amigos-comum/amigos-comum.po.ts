import { browser, by, element } from "protractor";

export class AmigosComumPage {
    
    async navigateTo(){
        return browser.get('/amigos_comum');
    }

    getAmigosSelector(){
        return element(by.id('amigos'));
    }

    getButton(){
        return element(by.id('submit'));
    }
}