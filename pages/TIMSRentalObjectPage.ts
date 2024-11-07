import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test'
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSRentalObjectPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly rentalObjectBtn: Locator;
    readonly finishBtn: Locator;
    readonly businessEntityName: Locator;
    readonly businessEntityNameField: Locator;
    readonly errorMessage: Locator;
    readonly rentalObjectText: Locator;
    readonly gotoRO: Locator;
    readonly integrationStatusNotIntegrated: Locator;
    readonly siteRecord: Locator;
    readonly successMessage: Locator;
    readonly sendToEVOBTN: Locator;
    readonly confirm: Locator;
    readonly ROText: Locator;
    readonly integrationStatusInQueue: Locator;
    readonly companyCode: Locator;

    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.rentalObjectBtn = page.getByRole('button', { name: 'Create Rental Object' });
        this.rentalObjectText = page.getByLabel('Rental_Object_Text_roCreate');
        this.finishBtn = page.getByRole('button', { name: 'Finish' });
        this.errorMessage = page.getByText('Please create a Lease on site');
        this.gotoRO = page.getByRole('link', { name: 'Go to RO-' });
        this.integrationStatusNotIntegrated = page.locator('lightning-formatted-text').filter({ hasText: 'Not Integrated' });
        this.integrationStatusInQueue = page.locator('lightning-formatted-text').filter({ hasText: 'In Queue' });
        this.businessEntityName = page.locator('lightning-output-field').filter({ hasText: 'Business Entity Name' }).locator('lightning-formatted-text');
        this.businessEntityNameField = page.getByLabel('Business Entity Name');
        this.siteRecord = page.getByRole('link', { name: 'CZ-TIMS-' });
        this.successMessage = page.locator('.toastMessage');
        this.sendToEVOBTN = page.getByRole('button', { name: 'Send to EVO' });
        this.confirm = page.getByRole('button', { name: 'Confirm' });
        this.ROText = page.getByText('*Rental Object Text');
        this.companyCode = page.getByPlaceholder('CZ91');
    }

    @step("Enter Business Entinity Name")
    async enterBusinessEnitityName(): Promise<void> {
        await this.businessEntityName.waitFor({ state: 'visible' });
        await this.businessEntityName.dblclick();
        await this.businessEntityNameField.fill("Auto Test");
        await this.actionObj.saveRecord();
        await this.successMessage.waitFor({ state: 'visible' });
        //await expect(this.page.locator('.toastMessage')).toContainText('Successfully saved changes!', { timeout: 150000 });
    }

    @step("User Create new Rental Object without Lease")
    async createRentalObjectWithoutLease(): Promise<void> {
        await this.rentalObjectBtn.click();
        await expect(this.errorMessage).toBeVisible({timeout:150000});
        await this.finishBtn.click();
    }

    @step("User Create new Rental Object")
    async createRentalObject(): Promise<void> {
        await this.ROText.waitFor({ state: 'visible' });
        await this.companyCode.waitFor({ state: 'visible' });
        await this.actionObj.gotoNext();
        await this.gotoRO.click();
        await this.integrationStatusNotIntegrated.waitFor({ state: 'visible' });
        await expect(this.integrationStatusNotIntegrated).toBeVisible({ timeout: 150000 });
    }

    @step("Navigate to Site")
    async navigateToSite(): Promise<void> {
        await this.siteRecord.click();
    }

    @step("Send Rental Object to EVO")
    async sendROtoEVO(): Promise<void> {
        await this.sendToEVOBTN.click();
        await this.confirm.click();
        //await this.successMessage.waitFor({ state: 'visible' });
        ////await expect(this.page.getByText('SUCCESS', { exact: true })).toContainText('SUCCESS', { timeout: 150000 });
        await this.integrationStatusInQueue.waitFor({ state: 'visible' });
        await expect(this.integrationStatusInQueue).toBeVisible({ timeout: 150000 });
    }

    @step("Select TIMS Company code from List")
    async selectTIMSCompanyCode(): Promise<void> {
        await this.page.waitForSelector('select[name="Choose_Company_Code_ccSelector"]');
        // Select the option by the visible text (label)
        await this.page.selectOption('select[name="Choose_Company_Code_ccSelector"]', { value: "companyCodeOptions.a313X000000mocTQAQ" });
        const selectedOption = await this.page.locator('select[name="Choose_Company_Code_ccSelector"]').inputValue();
        expect(selectedOption).toBe('CZ91');   
      }
}