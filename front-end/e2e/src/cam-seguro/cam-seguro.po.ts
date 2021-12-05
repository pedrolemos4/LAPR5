import { browser, by, element } from "protractor";

export class CamSeguroPage {
    
    async navigateTo(){
        return browser.get('/cam_seguro');
    }

    getSelector(){
        return element(by.id('amigos'));
    }

    getForcaTextBox(){
        return element(by.id('forca'));
    }

    getButton(){
        return element(by.id('submit'));
    }
}