import { browser } from 'protractor';
import { LoginPage } from './login.po';

describe('Login tests', () => {
    let page: LoginPage;
    
    beforeEach(() => {
        page = new LoginPage(); 
    });

    it('Should Login', async () => {
        await page.navigateTo();
        await page.getEmailTextbox().sendKeys('fiona@gmail.com');
        await page.getPasswordTextbox().sendKeys('super+Fifi48');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't Login - Wrong Password", async () => {
        await page.navigateTo();
        await page.getEmailTextbox().sendKeys('fiona@gmail.com');
        await page.getPasswordTextbox().sendKeys('aBcth35+65');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't login", async () => {
        await page.navigateTo();
        await page.getEmailTextbox().sendKeys('');
        await page.getPasswordTextbox().sendKeys('');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(!valLocalStorage);
    });
})