import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

export default class TIMSApplicationPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly projectPage: Locator;
    readonly projectTemplate: Locator;
    readonly projectTemplateValue: Locator;
    readonly newSubProjectButton: Locator;
    readonly projectStatus: Locator;
    readonly editBtn: Locator;
    readonly projectStartDateF: Locator;
    readonly updateBts: Locator;
    readonly searchList: Locator;
    readonly projectRecord: Locator;
    readonly updatedValue: Locator;
    readonly saveBtn: Locator;

    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.projectPage = page.getByRole('link', { name: 'Projects', exact: true });
        this.projectTemplate = page.getByPlaceholder('Search Project Templates...');
        //page.getByLabel('New Project').getByTitle('New BTS Site');
        this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site', exact: true });
        //this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site' }).locator('svg');
        this.newSubProjectButton = page.getByText('New Sub Project');
        this.projectStatus = page.locator('records-highlights-details-item').filter({ hasText: 'DraftProject Status' }).locator('lightning-formatted-text');
        this.projectStartDateF = page.getByText('Project Start Date (F)', { exact: true });
        this.updatedValue = page.getByText('25', { exact: true });
        this.updateBts = page.locator('button[name="update"]');
        this.searchList = page.getByPlaceholder('Search this list...');
        this.projectRecord = page.getByRole('link', { name: 'P-861109' });
    }

    @step("Open Project Page")
    async openProjectPage(): Promise<void> {
        await this.projectPage.click();
        this.actionObj.createNewObject();
    }

    @step("User Create new Project")
    async createProject(tamplateProject: string): Promise<void> {
        await this.projectTemplate.fill(tamplateProject);
        await this.projectTemplate.click();
        await this.projectTemplateValue.click();
        await this.actionObj.saveRecord();
        //await this.projectStatus.waitFor({ state: 'visible' });
    }

    @step("User Create new Sub Project")
    async createNewSubProject(tamplateProject: string): Promise<void> {
        await this.newSubProjectButton.waitFor({ state: 'visible' });
        await this.newSubProjectButton.click();
    }

    // @step("User select project")
    // async selectRecord(projectID: string): Promise<void> {
    //     await this.projectPage.click();
    //     await this.searchList.fill(projectID);
    //     await this.searchList.press('Enter');
    //     await this.projectRecord.click();
    // }

    // @step("User select project")
    // async updateProject(): Promise<void> {
    //     await this.projectStartDateF.dblclick();
    //     await this.updatedValue.click();
    //     await this.saveBtn.click();
    // }

}