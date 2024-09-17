import { Page, Locator } from "@playwright/test";
import { step } from "../utils/StepDecorator";
import { expect } from "@playwright/test";

export default class V5LandingPage {

    readonly page: Page;
    readonly timsSearchBox: Locator;
    readonly searchBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.timsSearchBox = page.getByPlaceholder('Enter TIMS code');
        this.searchBtn = page.getByRole('button', { name: 'Search' })
    }

    @step("Search for the smart site in V5 site configurator")
    async searchForSmartSite(timsSiteCode: string): Promise<void> {

        await expect(this.timsSearchBox).toBeVisible({ timeout: 10000 })
        await this.timsSearchBox.fill(timsSiteCode);
        await this.page.keyboard.press('Enter');

        const SiteCode = this.page.getByRole('cell', { name: timsSiteCode });


        await expect(SiteCode).toBeVisible({ timeout: 5000 }).catch(async () => {
            // Retry mechanism
            while (!(await SiteCode.isVisible())) {
                await this.timsSearchBox.fill(timsSiteCode);
                await this.page.keyboard.press('Enter');
            }
        });
        console.log(`Found Smart Site in V5: ${timsSiteCode}`);

        // if (await SiteCode.isVisible()) {
        //     console.log("Found Smart Site in V5: " + timsSiteCode);
        //     await expect(SiteCode).toBeVisible({ timeout: 5000 });
        // } else {
        //     while (!(SiteCode.isVisible())) {
        //         await this.timsSearchBox.fill(timsSiteCode);
        //         await this.page.keyboard.press('Enter');
        //     }
        //     console.log("Found Smart Site " + timsSiteCode + " in Commander V5");
        // }
    }
}