import { Page, Locator } from 'playwright';


export default class CommanderQuickAccessPage {
    readonly page: Page;
    readonly portal: Locator;
  

    constructor(page: Page) {
        this.page = page;
        this.portal = page.locator('#recently-used-apps').getByRole('link', { name: 'Portal Portal' });
    }

    async openPortal() {
        await this.portal.click(); 
    }

}