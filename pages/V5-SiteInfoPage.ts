import { Page, Locator, expect } from "@playwright/test";
import { step } from "../utils/StepDecorator";

export default class V5SiteInfoPage {

    readonly page: Page;
    readonly staticInformationTab: Locator;
    readonly siteTab: Locator;
    readonly siteStatus: Locator;
    readonly siteName: Locator;
    readonly long: Locator;
    readonly lat: Locator;
    readonly refreshSiteInfoBtn: Locator;


    constructor(page: Page) {
        this.staticInformationTab = page.getByRole('button', { name: 'Static Information' });
        this.siteTab = page.getByText('Site', { exact: true });
        this.siteStatus = page.locator('xpath=//span[text()="Site Status"]/following-sibling::*[text()="Pipeline"]');
        this.siteName = page.locator('xpath=//span[text()="Site Name"]/following-sibling::*[text()="test Automation"]');
        this.long = page.locator('xpath=//span[text()="Longitude"]/following-sibling::*[text()="2.5"]');
        this.lat = page.locator('xpath=//span[text()="Latitude"]/following-sibling::*[text()="1.5"]');

        this.refreshSiteInfoBtn = page.locator('.ml-auto');
    }

    @step("Check site information in TIMS reached V5")
    async checkSiteDetails(): Promise<void> {
        await this.staticInformationTab.click();
        if (await this.siteStatus.isVisible({ timeout: 40000 })) {
            console.log("Site information received in V5");
            // expect(this.siteStatus).toHaveText("Pipeline");
        } else {
            while (!(await this.siteStatus.isVisible())) {
                await this.refreshSiteInfoBtn.click();
            }
            console.log("TIMS Site information reached V5");
        }
    }
}