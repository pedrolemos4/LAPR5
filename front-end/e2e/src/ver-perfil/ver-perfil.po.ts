import { browser, by, element } from "protractor";

export class VerPerfilPage {
    
    async navigateTo(){
        return browser.get('/perfil');
    }
}