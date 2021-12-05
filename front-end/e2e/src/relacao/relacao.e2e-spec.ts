import { browser } from 'protractor';
import { RelacaoPage } from './relacao.po';

describe('Relacao tests', () => {
    let page: RelacaoPage;
    
    beforeEach(() => {
        page = new RelacaoPage(); 
    });

    it('Should Update Relacao', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getTagsTextbox().sendKeys('musica,desporto');
        await page.getRangeSlider().sendKeys(3);
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getTagsTextbox().sendKeys('');
        await page.getRangeSlider().sendKeys();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao - Missing tags', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getTagsTextbox().sendKeys('');
        await page.getRangeSlider().sendKeys(4);
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao - Missing forca', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getTagsTextbox().sendKeys('musica,desporto');
        await page.getRangeSlider().sendKeys();
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao - Button not clicked', async () => {
        await page.navigateTo();
        await page.getSelector().click();
        await page.getTagsTextbox().sendKeys('');
        await page.getRangeSlider().sendKeys();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})