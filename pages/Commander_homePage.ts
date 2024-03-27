import { Page, Locator } from 'playwright';


export default class CommanderHomePage {
    readonly page: Page;
    readonly entityManagment: Locator;
  

    constructor(page: Page) {
        this.page = page;
        this.entityManagment = page.getByRole('link', { name: ' Entity management' });
    }

    async clickEntityMNG() {
        await this.entityManagment.click();
    }

}