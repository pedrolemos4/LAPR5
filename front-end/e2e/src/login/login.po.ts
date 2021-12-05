import { browser, by, element } from "protractor";

export class LoginPage {
    
    async navigateTo(){
        return browser.get('/login');
    }

    getEmailTextbox() {
        return element(by.id('email'));
    }
    getPasswordTextbox() {
        return element(by.id('password'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}