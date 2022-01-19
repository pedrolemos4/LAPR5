import { browser, by, element } from "protractor";

export class TagCloudPessoalPage {
    
    async navigateTo(){
        return browser.get('/tag_cloud_pessoal');
    }
}