import { browser, by, element } from "protractor";

export class SugerirGruposPage {
    
    async navigateTo(){
        return browser.get('/sugerir_grupos');
    }

    getUsersTextbox() {
        return element(by.id('nUsers'));
    }

    getTagsTextbox() {
        return element(by.id('nTags'));
    }

    getTagsObsTextbox() {
        return element(by.id('tagsObg'));
    }

    getButton() {
        return element(by.id('Calcular'));
    }
}