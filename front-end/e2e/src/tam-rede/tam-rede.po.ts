import { browser, by, element } from "protractor";

export class TamRedePage {
    
    async navigateTo(){
        return browser.get('/tam_rede');
    }

    getNivelTextbox(){
        return element(by.id('nivel'));
    }

    getButton(){
        return element(by.id('submit'));
    }
}