import { browser } from 'protractor';
import { ComentarPostPage } from './comentar-post.po';

describe('Comentar Post tests', () => {
    let page: ComentarPostPage;
    
    beforeEach(() => {
        page = new ComentarPostPage();
    });

    it('Should Get Comentarios', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})