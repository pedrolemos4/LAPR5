import { browser, by, element } from "protractor";

export class IntroducaoPage {
    
    async navigateTo(){
        return browser.get('/introducao');
    }

    getButtonAceitar(){
        return element(by.id('aceitar'));
    }

    getButtonRejeitar(){
        return element(by.id('rejeitar'));
    }
}