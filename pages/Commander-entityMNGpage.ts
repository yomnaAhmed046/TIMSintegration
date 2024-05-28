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

    // public timsSiteInfoPage: TIMSsiteInfoPage; 
    
    private readonly timsSiteCodeText: string | null;


    constructor(page: Page , timsSiteCodeText: string | null) {
        this.page = page;
       // this.searchTxt = page.getByRole('textbox');
        this.searchTxt= page.locator('xpath=//input[@class="dx-texteditor-input"] [@role="textbox"]');
        this.searchBtn = page.getByLabel('fa fa-search');
        this.searchResult = page.locator('tree-search-item div').first();
        this.propertySearchBox = page.getByRole('textbox', { name: 'Filter cell' }).first();
        this.siteTIMScode = page.getByRole('gridcell', { name: '-TIMS-' }).first();

        this.timsSiteCodeText = timsSiteCodeText; // Store TIMSsiteCodeText
        
    }

    async searchForSmartSite() {  
       await this.searchTxt.fill(this.timsSiteCodeText ?? '');
       // await this.searchBtn.click();
       await this.page.keyboard.press('Enter');
        await expect(this.searchResult).toBeVisible();
        await this.searchResult.click();
        // await expect(this.propertySearchBox).toBeVisible({timeout:20000});
        // await this.propertySearchBox.fill("TIMS site code");
        // console.log("xxxxxxxx " + await this.siteTIMScode.textContent() + " xxxxxxxx");

    }
}}
