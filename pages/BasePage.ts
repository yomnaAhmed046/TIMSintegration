import { Page, Locator } from 'playwright';

export class BasePage {

    readonly page: Page;

    constructor(page:Page){
        this.page = page ;
    }

    async openUrl(url) {
        await this.page.goto(url);
      }


    async clickElement(locator: Locator) {
        await locator.click();
     }
    
     async type(locator: Locator, text: string) {
        await locator.fill(text);
      }


    async getText(locator: Locator, text:string) {
        return await this.page.textContent(text);
    }

    // async waitForElementVisiblity(selector, timeout = 30000) {
    //     await this.page.waitForSelector(selector, { state: 'visible', timeout });
    // }

    // async waitForElementHidden(selector, timeout = 30000) {
    //     await this.page.waitForSelector(selector, { state: 'hidden', timeout });
    //   }
      
}
