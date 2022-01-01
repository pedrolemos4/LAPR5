import { browser, by, element } from "protractor";

export class TagsTodosJogadoresPage {
    
    async navigateTo(){
        return browser.get('/tags_todos_jogadores');
    }
}