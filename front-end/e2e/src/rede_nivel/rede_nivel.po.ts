import { browser, by, element } from "protractor";

export class RedeNivelPage {
    
    async navigateTo(){
        return browser.get('/rede_nivel');
    }

    getNivelTextbox() {
        return element(by.id('nivel'));
    }

    getBtnVerRede() {
        return element(by.id('submit'));
    }
}