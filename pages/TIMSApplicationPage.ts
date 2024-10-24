import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';

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
        this.searchBoxforApp = page.locator(`[name='Application-search-input']`);
        this.appRecord = page.getByRole('link', { name: 'A153454' });

    }

    async openApplicationPage() {
        await this.applicationTab.click();
        this.actionObj.createNewObject();
    }

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

    async createModifyExistingSiteApp(customer: string, scopeOfWork: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.actionObj.saveRecord();
    }

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

    async createNewColocationSiteApp(customer: string, scopeOfWork: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.actionObj.enterSiteConfig();
        await this.actionObj.saveRecord();
    }

    async createSiteExitbyCustomerApp(customer: string, scopeOfWork: string, removalDate: string) {
        await this.actionObj.enterCustomerAccount(customer);
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.removalDate.click();
        await this.removalDate.fill(removalDate);
        await this.actionObj.saveRecord();
    }





}
