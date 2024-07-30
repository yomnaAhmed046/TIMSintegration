import { Page, Locator } from 'playwright';

export class BasePage {

    readonly page: Page;

    constructor(page:Page){
        this.page = page ;
    }

    async openUrl(url) {
        await this.page.goto(url);
      }

    async getText(locator: Locator, text:string) {
        return await this.page.innerText(text);
    } 
}
