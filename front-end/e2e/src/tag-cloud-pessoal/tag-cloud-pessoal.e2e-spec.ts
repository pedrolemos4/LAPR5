import { browser } from 'protractor';
import { TagCloudPessoalPage } from './tag-cloud-pessoal.po';

describe('Tag Cloud Pessoal tests', () => {
    let page: TagCloudPessoalPage;
    
    beforeEach(() => {
        page = new TagCloudPessoalPage();
    });

    it('Should Get Tag Cloud Pessoal', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})