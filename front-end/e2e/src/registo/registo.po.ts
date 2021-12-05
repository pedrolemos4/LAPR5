import { browser, by, element } from "protractor";

export class RegistoPage {
    
    async navigateTo(){
        return browser.get('/registo');
    }

    getNomeTextbox() {
        return element(by.name('nome'));
    }
    getEmailTextbox() {
        return element(by.name('email'));
    }
    getTelefoneTextbox() {
        return element(by.name('telefone'));
    }
    getPaisTextbox() {
        return element(by.name('pais'));
    }
    getCidadeTextbox() {
        return element(by.name('cidade'));
    }
    getDataNascimentoTextbox() {
        return element(by.name('dataNascimento'));
    }
    getEstadoHumorTextbox() {
        return element(by.name('estadoHumor'));
    }
    getTagsTextbox() {
        return element(by.name('tags'));
    }
    getPerfilFbTextbox() {
        return element(by.name('perfilFb'));
    }
    getPerfilLTextbox() {
        return element(by.name('perfilL'));
    }
    getPasswordTextbox() {
        return element(by.name('password'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}