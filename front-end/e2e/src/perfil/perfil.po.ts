import { browser, by, element } from "protractor";

export class PerfilPage {
    
    async navigateTo(){
        return browser.get('/ver_perfil');
    }

    getNomeTextbox() {
        return element(by.id('nome'));
    }
    getEmailTextbox() {
        return element(by.id('email'));
    }
    getPaisTextbox() {
        return element(by.id('pais'));
    }
    getEstadoTextbox() {
        return element(by.id('estado'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}