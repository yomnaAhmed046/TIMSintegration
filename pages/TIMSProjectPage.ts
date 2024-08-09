import { Page, Locator } from 'playwright';
import Actions from './Actions';

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

    async openProjectPage() {
        await this.projectPage.click();
        this.actionObj.createNewObject();
    }

    async createProject(tamplateProject: string) {
        await this.projectTemplate.fill(tamplateProject);
        await this.projectTemplate.click();
        await this.projectTemplateValue.click();
        await this.actionObj.saveRecord();
    }
}