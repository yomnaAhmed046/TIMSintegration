import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';
import {step} from '../utils/StepDecorator'

export default class TIMSApplicationPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly applicationTab: Locator;
    readonly applicationsButton: Locator;
    readonly modifyExistingSite: Locator;
    readonly newBTS: Locator;
    readonly siteExitbyCustomer: Locator;
    readonly newCoLocatioApp: Locator;

    //Locators for new BTS
    readonly newBTSApp: Locator;
    readonly lat: Locator;
    readonly long: Locator;
    readonly radius: Locator;
    readonly BTSCommitmentSite: Locator;
    readonly BTSCommitmentValue: Locator;

    //Locators for Site Exit by Customer
    readonly removalDate: Locator;

    //Loctors for submit Application
    readonly searchBoxforApp: Locator;
    readonly appRecord: Locator;

    //Locators for Submit for Approval
    readonly submitForApprovalBtn: Locator;
    readonly submitBtn: Locator;
    readonly workflowTab: Locator;
    readonly externalApproveBtn: Locator;
    readonly internalApproveBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);
        this.modifyExistingSite = page.locator('label').filter({ hasText: 'Modify Existing Site' }).locator('span').first();
        this.applicationTab = page.getByRole('link', { name: 'Applications' });
        //locators New BTS Application
        this.newBTS = page.locator('label').filter({ hasText: 'New Built-to-Suit Site (BTS)' }).locator('div').first();
        this.lat = page.getByLabel('*Search Ring Latitude');
        this.long = page.getByLabel('*Search Ring Longitude');
        this.radius = page.getByLabel('*Search Ring Radius');

        //this.BTSCommitmentSite = page.getByLabel('BTS Commitment Site - Current Selection: --None--');
        this.BTSCommitmentSite = page.getByRole('combobox', { name: 'BTS Commitment Site' });
        this.BTSCommitmentValue = page.getByRole('option', { name: 'No', exact: true });

        //locators New Co-location Site
        this.newCoLocatioApp = page.locator('label').filter({ hasText: 'New Co-location Site' }).locator('div').first();

        //Locators Site Exit by Customer
        this.siteExitbyCustomer = page.locator('label').filter({ hasText: 'Site Exit by Customer' }).locator('span').first();
        this.removalDate = page.getByLabel('*Removal date');

        // Locators for Submit the Application
        //this.searchBoxforApp = page.locator(`[name='Application-search-input']`);
        //this.appRecord = page.getByRole('link', { name: 'A153454' });
        this.submitForApprovalBtn = page.getByText('Submit for Approval');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.workflowTab = page.locator('a').filter({ hasText: 'Workflow' });
        this.externalApproveBtn = page.locator('a').filter({ hasText: /^Approve$/ })
        this.internalApproveBtn = page.getByLabel('Approve Application').getByRole('button', { name: 'Approve' });
        
    }
    
    @step("Open Appliaction Page")
    async openApplicationPage() {
        await this.applicationTab.click();
        this.actionObj.createNewObject();
    }
    
    @step("Select Application tybe to be created")
    async selectAppType(appType: string) {
        switch (appType) {
            case "modifyExistingSite":
                await this.modifyExistingSite.click();
                await this.actionObj.gotoNext();
                break;

            case "newBTS":
                await this.newBTS.click();
                await this.actionObj.gotoNext();
                break;

            case "newCoLocatioApp":
                await this.newCoLocatioApp.click();
                await this.actionObj.gotoNext();
                break;

            case "SiteExitbyCustomerApp":
                await this.siteExitbyCustomer.click();
                await this.actionObj.gotoNext();
                break;
            default:
                console.log("Unknown Application Selection.");
        }
    }
    
    @step("Create Modify Existing Site Application")
    async createModifyExistingSiteApp(customer: string, scopeOfWork: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.actionObj.saveRecord();
    }
    
    @step("Create New BTS Application")
    async createNewBTSApp(customer: string, scopeOfWork: string, lat: string, long: string, radius: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.BTSCommitmentSite.click();
        await this.BTSCommitmentValue.click();
        await this.lat.fill(lat);
        await this.long.fill(long);
        await this.radius.fill(radius);
        await this.actionObj.saveRecord();
    }

    @step("Create New Colocation Application")
    async createNewColocationSiteApp(customer: string, scopeOfWork: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.actionObj.enterSiteConfig();
        await this.actionObj.saveRecord();
    }
    
    @step("Create Site Exit by Customer Application")
    async createSiteExitbyCustomerApp(customer: string, scopeOfWork: string, removalDate: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.removalDate.click();
        await this.removalDate.fill(removalDate);
        await this.actionObj.saveRecord();
    }

    @step("Submit the Application for Approval")
    async submitForApproval() {
        await this.submitForApprovalBtn.click();
        await this.page.pause();
        await this.submitBtn.click();
        await this.page.pause();
    }

    @step("Open the Workflow Tab")
    async openWorkflowTab() {
        //await this.actionObj.opemMoreTabs();
        //await this.page.pause();
        await this.workflowTab.click();
        await this.page.pause();
    }

    @step("Approve the Application")
    async approveApplication() {
        await this.externalApproveBtn.click();
        await this.internalApproveBtn.click();
    }
}
