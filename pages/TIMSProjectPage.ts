import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';
import {step} from '../utils/StepDecorator';

export default class TIMSApplicationPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly projectPage: Locator;
    readonly projectTemplate: Locator;
    readonly projectTemplateValue: Locator;
    
    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.projectPage = page.getByRole('link', { name: 'Projects' });
        this.projectTemplate = page.getByPlaceholder('Search Project Templates...');
        this.projectTemplateValue = page.getByRole('option', { name: 'New BTS Site', exact: true });
    }
    @step("Open Project Page")
    async openProjectPage() {
        await this.projectPage.click();
        this.actionObj.createNewObject();
    }
    @step("User Create new Project")@step("User Create new Project")
    async createProject(tamplateProject: string) {
        await this.projectTemplate.fill(tamplateProject);
        await this.projectTemplate.click();
        await this.projectTemplateValue.click();
        await this.actionObj.saveRecord();
    }
}