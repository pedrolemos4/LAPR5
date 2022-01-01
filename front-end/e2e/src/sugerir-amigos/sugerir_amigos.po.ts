import { browser, by, element } from "protractor";

export class SugerirAmigosPage {
    
    async navigateTo(){
        return browser.get('/sugerir_amigos');
    }

    getNivelTextbox() {
        return element(by.id('numeroNiveis'));
    }

    getButton() {
        return element(by.id('submit'));
    }
}