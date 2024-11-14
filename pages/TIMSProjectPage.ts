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

    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.projectPage = page.getByRole('link', { name: 'Projects', exact: true });
        this.projectTemplate = page.getByPlaceholder('Search Project Templates...');
        //page.getByLabel('New Project').getByTitle('New BTS Site');
        this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site', exact: true });
        //this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site' }).locator('svg');
        this.newSubProjectButton = page.getByText('New Sub Project');
        this.projectStatus = page.locator('records-highlights-details-item').filter({ hasText: 'DraftProject Status' }).locator('lightning-formatted-text');
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

}