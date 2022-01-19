import { browser, by, element } from "protractor";

export class CamCurtoPage {
    
    async navigateTo(){
        return browser.get('/cam_curto');
    }

    getSelector(){
        return element(by.id('amigos'));
    }

    getButton(){
        return element(by.id('Calcular'));
    }
}