import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import TIMSsiteInfoPage from './TIMS_siteInfoPage'
import TIMSnewSitePage from './TIMS_newSitePage';

export default class CommanderEntityMNGPage {
    readonly page: Page;
    readonly searchTxt: Locator;
    readonly searchBtn: Locator;
    readonly searchResult: Locator;
    readonly propertySearchBox: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchTxt= page.locator('xpath=//input[@class="dx-texteditor-input"] [@role="textbox"]');
        this.searchBtn = page.getByLabel('fa fa-search');
        this.searchResult = page.locator('tree-search-item div').first();

    }

    async searchForSmartSite(timsSiteCode: string) {  
        await this.searchTxt.fill(timsSiteCode);
        await this.searchBtn.click();

        if (await this.searchResult.isVisible()) {
            console.log("Found Smart Site");
            await expect(this.searchResult).toBeVisible({timeout:20000});
            
        } else {

            while (true) {
                if (await this.searchResult.isVisible()) {
                    break;
                } else {
                    await this.searchBtn.click();
                }
        }
        await expect(this.searchResult).toBeVisible({timeout:20000});
    }
}
}
