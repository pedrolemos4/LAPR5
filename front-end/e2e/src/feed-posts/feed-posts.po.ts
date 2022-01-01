import { browser, by, element } from "protractor";

export class FeedPostsPage {
    
    async navigateTo(){
        return browser.get('/feed_posts');
    }

    getPlayerSelector() {
        return element(by.id('selector'));
    }
}