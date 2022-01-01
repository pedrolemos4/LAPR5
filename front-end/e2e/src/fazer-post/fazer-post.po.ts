import { browser, by, element } from "protractor";

export class FazerPostPage {
    
    async navigateTo(){
        return browser.get('/fazer_post');
    }

    getPostTextbox() {
        return element(by.id('post'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}