import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import TIMSsiteInfoPage from './TIMS_siteInfoPage'


export default class CommanderEntityMNGPage {
    readonly page: Page;
    readonly searchTxt: Locator;
    readonly searchBtn: Locator;
    readonly searchResult: Locator;
    readonly propertySearchBox: Locator;
    readonly siteTIMScode: Locator;



    constructor(page: Page) {
        this.page = page;
        this.searchTxt = page.getByRole('textbox');
        this.searchBtn = page.getByLabel('fa fa-search');
        this.searchResult = page.locator('tree-search-item div').first();
        this.propertySearchBox = page.getByRole('textbox', { name: 'Filter cell' }).first();
        this.siteTIMScode = page.getByRole('gridcell', { name: 'DE-TIMS-' }).first();
    }

    async searchForSmartSite() {
        await this.searchTxt.fill("DE-TIMS-099764");
        await this.searchBtn.click();
        await expect(this.searchResult).toBeVisible();
        await this.searchResult.click();
        await expect(this.propertySearchBox).toBeVisible({timeout:20000});
        await this.propertySearchBox.fill("TIMS site code");
        console.log("xxxxxxxx " + await this.siteTIMScode.textContent() + " xxxxxxxx");

    }



}


// await page.locator('tree-item-template div').click();
// await page.getByText('Germany Raptor Sites -').click();
// await page.locator('tree-search-item').click();
// await page.locator('tree-search-item div').first().click();
