import { Page, Locator } from "@playwright/test";
import { step } from "../utils/StepDecorator";

export default class V5SiteInfoPage{

    readonly page: Page;
    readonly staticInformationTab: Locator;
    readonly siteTab: Locator;

    constructor(page: Page){
        this.staticInformationTab = page.getByRole('button', { name: 'Static Information' });
        this.siteTab = page.getByText('Site', { exact: true });
    }

    @step("Checking site details tab")
    async checkSiteDetails(): Promise<void>{
        await this.staticInformationTab.click();
        await this.siteTab.click();
    }
}