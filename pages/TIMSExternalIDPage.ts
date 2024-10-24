import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSExternalIDPage {

    readonly page: Page;
    readonly externalIDPage: Locator;
    readonly externalID: Locator;
    readonly custAccount: Locator;
    readonly actionObj: Actions;
  
    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);
        this.externalIDPage = page.getByRole('link', { name: 'External IDs', exact: true });
        this.externalID = page.getByLabel('*External ID')
    
    }


    @step("User creates a new External ID")
    async createExternalID(externalIDValue: string,customerAccountValue: string ): Promise<void> {
        
        await this.externalID.fill(externalIDValue);
        await this.actionObj.enterCustomerAccount(customerAccountValue);
        await this.actionObj.saveRecord();
    }
}
