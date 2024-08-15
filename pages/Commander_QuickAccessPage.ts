import { Page, Locator } from 'playwright';
import { step } from '../utils/StepDecorator';

export default class CommanderQuickAccessPage {
    readonly page: Page;
    readonly portal: Locator;


    constructor(page: Page) {
        this.page = page;
        this.portal = page.locator('#recently-used-apps').getByRole('link', { name: 'Portal Portal' });
    }

    @step("Select Portal in Commander Quick Access")
    async openPortal(): Promise <void> {
        await this.portal.click();
    }

}