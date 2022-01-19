import { browser, by, element } from "protractor";

export class VerForcaRelacaoPage {
    
    async navigateTo(){
        return browser.get('/ver_forca_relacao');
    }
}