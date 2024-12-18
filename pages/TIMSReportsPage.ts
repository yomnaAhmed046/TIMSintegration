import { Page, Locator, FrameLocator } from 'playwright';
import { expect } from '@playwright/test';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSReportsPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly reportPage: Locator;
    readonly operationLog: Locator;
    readonly frame: FrameLocator;
    readonly filteBtn: Locator;
    readonly refresh: Locator;
    readonly searchBtn: Locator;
    readonly searchText: Locator;
    readonly projectID: Locator;
    readonly firstRecord: Locator;

    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);
        this.reportPage = page.getByRole('link', { name: 'Reports', exact: true });
        this.operationLog = page.getByRole('link', { name: 'Operation Logs Report_today' });
        this.frame = page.frameLocator('//iframe[contains(@name,"builder-")]').nth(0);
        this.refresh = this.frame.locator('#report-main button').filter({ hasText: 'Refresh' });
        this.filteBtn = this.frame.locator('#report-main button').filter({ hasText: /^Filters$/ });
        //this.searchBtn = this.frame.getByPlaceholder('Search report table...');
        this.searchText = this.frame.getByPlaceholder('Search report table...');
        this.searchBtn = this.frame.locator('button').filter({ hasText: 'Search report table' });
        this.projectID = this.frame.locator('#full-data-grid-7-row0-col12').getByText('{ "id": "a0BKL000000NeWI2A0", "');
       // this.firstRecord = this.frame.locator('#fixed-column-data-grid-7-row0-fixedcol0 div').nth(0);
       this.firstRecord = this.frame.getByRole('link', { name: 'OL-' }).nth(0);
    }

    @step("Open Reports Page")
    async openReportPage(): Promise<void> {
        await this.reportPage.click();
        await this.page.pause();
    }

    @step("open Operation Log")
    async openOperationLog(): Promise<void> {
        this.operationLog.click();
        console.log("before frame");
        await this.refresh.click();
        console.log("after frame");
        // await this.firstRecord.click();
        // console.log("the Operation Log should be opened");
    }

    @step("Filter the Operation Logs by ST Extenral ID ")
    async searchByID(idValue: string): Promise<void> {
        console.log("enter search function");
        await this.searchBtn.waitFor({ state: 'visible' });
        await this.searchBtn.click();
        await this.searchText.fill(idValue);
        await this.searchBtn.press('Enter');
        console.log("press enter successfully");
        
    }

    @step("Select First Record")
    async selectFirstRecord(): Promise<void> {
        await this.firstRecord.click();
        console.log("the Operation Log for first record should be opened");
        await this.page.pause();
    }

    @step("List all frames")
    async listAllFrames(): Promise<void> {
        this.operationLog.click();
        const frames = this.page.frames();
        frames.forEach((frame, index) => {
            console.log(`Frame ${index + 1}:`);
            console.log(`Name: ${frame.name()}`);
            console.log(`URL: ${frame.url()}`);
        });
    }

}