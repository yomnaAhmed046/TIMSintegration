import { Page, Locator } from 'playwright';


export default class TIMShomePage {
    readonly page: Page;
    readonly sitesTab: Locator;
    readonly newSiteButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.sitesTab = page.getByRole('button', { name: 'Sites List' });
        this.newSiteButton = page.getByRole('menuitem', { name: 'New Site' });
    }

    async createNewSite() {
        await this.sitesTab.click();
        await this.newSiteButton.click();
    }
}


