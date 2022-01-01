import { browser, by, element } from "protractor";

export class TagsTodasRelacoesPage {
    
    async navigateTo(){
        return browser.get('/tags_todas_relacoes');
    }
}