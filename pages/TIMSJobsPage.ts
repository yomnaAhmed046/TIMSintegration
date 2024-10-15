import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSJobsPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly jobName: Locator;
    readonly jobPage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);
        this.jobName = page.getByLabel('*Job Name');
        this.jobPage = page.getByRole('link', { name: 'Jobs', exact: true});
    }

    @step("Create Jobs in TIMS")
    async createJob(jobName: string) {
        await this.jobName.fill(jobName);
        await this.actionObj.saveRecord();
    }


}