import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

let randomInRange;
export default class TIMSCandidatePage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly candidatePage: Locator;
    readonly candidateName: Locator;
    readonly otherOperators: Locator;
    readonly otherOperatorsOption: Locator;
    readonly country: Locator;
    readonly countryOption: Locator;
    readonly streetAddres: Locator;


    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.candidatePage = page.getByRole('link', { name: 'Candidates', exact: true});
        //this.candidateName = page.getByLabel('*Candidate Name', { exact: true });
        this.candidateName = page.getByLabel('*Candidate Name');
        this.otherOperators = page.getByRole('combobox', { name: 'Other Operators' });
        this.otherOperatorsOption = page.getByRole('option', { name: 'No', exact: true }).locator('span').nth(1);
        this.country = page.getByRole('combobox', { name: 'Country' });
        this.countryOption = page.getByRole('option', { name: 'DE' }).locator('span').nth(1);
        this.streetAddres = page.getByLabel('Street Address', { exact: true });
        //this.streetAddres = page.getByLabel('Street Address', { exact: true });
    }

    async openCandidatePage() {
        //await this.page.waitForLoadState('networkidle');
        await this.actionObj.searchOpenObject("Candidates");
    }

    async openNewCandidate() {
        await this.actionObj.createNewObject();
    }
   
    async createCandidate() {
        randomInRange = Math.floor(Math.random() * 100);
        await this.candidateName.fill('Auto test'+randomInRange);
        await this.otherOperators.click();
        await this.otherOperatorsOption.click();
        await this.country.click();
        await this.countryOption.click();
        //await this.streetAddres.fill("AutoCandidate");
        await this.actionObj.saveRecord();
    }
}