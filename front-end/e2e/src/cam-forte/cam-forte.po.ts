import { browser, by, element } from "protractor";

export class CamFortePage {
    
    async navigateTo(){
        return browser.get('/cam_forte');
    }

    getSelector(){
        return element(by.id('amigos'));
    }

    getButton(){
        return element(by.id('submit'));
    }
}