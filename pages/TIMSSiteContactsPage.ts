import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';
import {step} from '../utils/StepDecorator';

export default class TIMSSiteContactsPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly projectPage: Locator;
    readonly siteContactPage: Locator;
    
    
    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);  
        this.siteContactPage = page.getByRole('link', { name: 'Site Contacts', exact: true}); 
    }
}