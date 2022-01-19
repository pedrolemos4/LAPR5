import { browser } from 'protractor';
import { VerPerfilPage } from './ver-algoritmos.po';

describe('Ver Algoritmos tests', () => {
    let page: VerPerfilPage;
    
    beforeEach(() => {
        page = new VerPerfilPage();
    });

    it('Should Load Page', async () => {
        await page.navigateTo();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get AStar Ligacao', async () => {
        await page.navigateTo();
        await page.getAStarLigBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get AStar Ligacao Relacao', async () => {
        await page.navigateTo();
        await page.getAStarLigRelBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get BestFirst Ligacao', async () => {
        await page.navigateTo();
        await page.getBestFirstLigBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get BestFirst Ligacao Relacao', async () => {
        await page.navigateTo();
        await page.getBestFirstLigRelBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get DFS Ligacao', async () => {
        await page.navigateTo();
        await page.getDFSLigBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it('Should Get DFS Ligacao Relacao', async () => {
        await page.navigateTo();
        await page.getDFSLigRelBtn().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });
})