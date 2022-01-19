import { browser, by, element } from "protractor";

export class VerAmigosGruposPage {
    
    async navigateTo(){
        return browser.get('/ver_amigos_grupos');
    }

    getAmigosComumBtn() {
        return element(by.id('amigosComum'));
    }

    getAmigosSugeridosBtn() {
        return element(by.id('amigosSugeridos'));
    }

    getGruposSugeridosBtn() {
        return element(by.id('gruposSugeridos'));
    }
}