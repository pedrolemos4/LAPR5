import { browser, by, element } from "protractor";

export class VerCaminhosPage {
    
    async navigateTo(){
        return browser.get('/ver_caminhos');
    }
}