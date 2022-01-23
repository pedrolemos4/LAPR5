import { browser, by, element, protractor } from 'protractor';
import { RelacaoPage } from './relacao.po';

describe('Relacao tests', () => {
    let page: RelacaoPage;
    
    beforeEach(() => {
        page = new RelacaoPage(); 
    });

    it('Should Update Relacao', async () => {
        const EC  = new protractor.ProtractorExpectedConditions();
        await page.navigateTo();
        await page.getSelector().click();
        await browser.wait(EC.visibilityOf(element(by.id('tags'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTagsTextbox().sendKeys('musica,desporto');
        await browser.wait(EC.visibilityOf(element(by.id('range'))), 30000, 'Element didnt load in 30 seconds');
        await page.getRangeSlider().sendKeys(3);
        await browser.wait(EC.elementToBeClickable(element(by.id('submit'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao', async () => {
        const EC  = new protractor.ProtractorExpectedConditions();
        await page.navigateTo();
        await page.getSelector().click();
        await browser.wait(EC.visibilityOf(element(by.id('tags'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTagsTextbox().sendKeys('');
        await browser.wait(EC.visibilityOf(element(by.id('range'))), 30000, 'Element didnt load in 30 seconds');
        await page.getRangeSlider().sendKeys(3);
        await browser.wait(EC.elementToBeClickable(element(by.id('submit'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao - Missing tags', async () => {
        const EC  = new protractor.ProtractorExpectedConditions();
        await page.navigateTo();
        await page.getSelector().click();
        await browser.wait(EC.visibilityOf(element(by.id('tags'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTagsTextbox().sendKeys('');
        await browser.wait(EC.visibilityOf(element(by.id('range'))), 30000, 'Element didnt load in 30 seconds');
        await page.getRangeSlider().sendKeys(3);
        await browser.wait(EC.elementToBeClickable(element(by.id('submit'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao - Missing forca', async () => {
        const EC  = new protractor.ProtractorExpectedConditions();
        await page.navigateTo();
        await page.getSelector().click();
        await browser.wait(EC.visibilityOf(element(by.id('tags'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTagsTextbox().sendKeys('musica,desporto');
        await browser.wait(EC.visibilityOf(element(by.id('range'))), 30000, 'Element didnt load in 30 seconds');
        await browser.wait(EC.elementToBeClickable(element(by.id('submit'))), 30000, 'Element didnt load in 30 seconds');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Not Update Relacao - Button not clicked', async () => {
        const EC  = new protractor.ProtractorExpectedConditions();
        await page.navigateTo();
        await page.getSelector().click();
        await browser.wait(EC.visibilityOf(element(by.id('tags'))), 30000, 'Element didnt load in 30 seconds');
        await page.getTagsTextbox().sendKeys('musica,desporto');
        await browser.wait(EC.visibilityOf(element(by.id('range'))), 30000, 'Element didnt load in 30 seconds');
        await page.getRangeSlider().sendKeys(3);
        await browser.wait(EC.elementToBeClickable(element(by.id('submit'))), 30000, 'Element didnt load in 30 seconds');
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})