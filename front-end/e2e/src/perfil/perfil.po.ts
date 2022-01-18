import { browser, by, element } from "protractor";

export class PerfilPage {
    
    async navigateTo(){
        return browser.get('/ver_perfil');
    }

    getNomeTextbox() {
        return element(by.id('nome'));
    }
    getPaisTextbox() {
        return element(by.id('pais'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}