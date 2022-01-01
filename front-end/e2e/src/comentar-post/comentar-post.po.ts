import { browser, by, element } from "protractor";

export class ComentarPostPage {
    
    async navigateTo(){
        return browser.get('/comentar_post');
    }

    getButton(){
        return element(by.id('submit'));
    }
}