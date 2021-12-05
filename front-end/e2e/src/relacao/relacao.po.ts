import { browser, by, element } from "protractor";

export class RelacaoPage {
    
    async navigateTo(){
        return browser.get('/relacao');
    }

    getSelector() {
        return element(by.id('selector'));
    }
    getTagsTextbox() {
        return element(by.id('tags'));
    }
    getRangeSlider() {
        return element(by.id('range'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}