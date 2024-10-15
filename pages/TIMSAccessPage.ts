import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSAccessPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly accessPage: Locator;

    


    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);
        this.accessPage = page.getByRole('link', { name: 'Site Access Requests', exact: true});
    }
}