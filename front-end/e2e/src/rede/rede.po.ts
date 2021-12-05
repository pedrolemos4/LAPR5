import { browser, by, element } from "protractor";

export class RedePage {
    
    async navigateTo(){
        return browser.get('/rede');
    }
}