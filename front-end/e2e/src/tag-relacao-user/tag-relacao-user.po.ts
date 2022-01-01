import { browser, by, element } from "protractor";

export class TagRelacaoUserPage {
    
    async navigateTo(){
        return browser.get('/tag_relacao_user');
    }
}