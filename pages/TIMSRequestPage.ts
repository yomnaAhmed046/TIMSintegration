import { Page, Locator} from 'playwright';
import { expect } from '@playwright/test'
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';
import { TIMEOUT } from 'dns';

export default class TIMSRequestPage {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly requestPage: Locator;
    readonly submitRequest: Locator;
    readonly submit: Locator;
    readonly removeUnusedEquipment: Locator;
    readonly equipmentRelocation: Locator;
    readonly higherPosition: Locator;
    readonly signalRepeat: Locator;
    readonly siteDecommissioning: Locator;
    readonly siteOfferbyTowerCo: Locator;
    readonly masterLeaseAgreement: Locator;
    readonly thirdrdPartyInterest: Locator;
    readonly HAndSRisk: Locator;
    readonly removalDate: Locator;

    readonly centerlineAvailable: Locator;
    readonly spaceAvailable: Locator;

    readonly forcedDecommissioning: Locator;
    readonly detailsOfDecommission: Locator;
    readonly removalDateActiveEquipment: Locator;
    readonly removalDatePassiveEquipment: Locator;

    constructor(page: Page) {
        this.page = page;
        this.actionObj = new Actions(page);
        this.requestPage = page.getByRole('link', { name: 'Requests', exact: true});
        this.submitRequest = page.getByText('Submit Request');
        //this.submitRequest= page.getByRole('button', { name: 'Submit Request' })
        this.submit = page.getByRole('button', { name: 'Submit' });
        this.removeUnusedEquipment = page.locator('label').filter({ hasText: 'Remove Unused Equipment' }).locator('span').first();
        this.equipmentRelocation = page.locator('label').filter({ hasText: 'Equipment Relocation (PIM)' }).locator('span').first();
        this.higherPosition = page.locator('label').filter({ hasText: 'Higher Position' }).locator('span').first();
        this.signalRepeat = page.locator('label').filter({ hasText: 'Signal Repeat' }).locator('span').first();
        this.siteDecommissioning = page.locator('label').filter({ hasText: 'Site Decommissioning' }).locator('span').first();
        this.siteOfferbyTowerCo = page.locator('label').filter({ hasText: 'Site Offer by TowerCo' }).locator('span').first();
        this.masterLeaseAgreement = page.getByRole('combobox', { name: 'Master Lease Agreement Applicable?' });
        this.thirdrdPartyInterest = page.getByRole('combobox', { name: '3rd Party Interest' });
        this.HAndSRisk = page.getByRole('combobox', { name: 'H&S Risk' });
        this.removalDate = page.getByLabel('*Removal Date');
        this.centerlineAvailable = this.page.getByRole('textbox', { name: 'Centerline Available (m)' });
        this.spaceAvailable = this.page.getByRole('textbox', { name: 'Space Available' });

        this.forcedDecommissioning = this.page.getByRole('combobox', { name: 'Forced Decommissioning' });
        this.detailsOfDecommission = this.page.getByLabel('*Details of Decommission');
        this.removalDateActiveEquipment = page.getByLabel('*Removal Date Active Equipment');
        this.removalDatePassiveEquipment = page.getByLabel('*Removal Date Passive');

    }

    @step("Open Request Page")
    async openRequestPage() :Promise<void> {
        console.log("1");
        await this.page.waitForLoadState('networkidle');
        console.log("2");
        await this.actionObj.searchOpenObject("Requests");
        console.log("3");

    }

    // async openNewRequest(){
    //     console.log("4");
    //     await this.actionObj.createNewObject();
    //     console.log("5");
    //  }

    @step("enter enter TIMS Site Code")
    async enterTIMSSiteCode(timsSiteCode: string) :Promise<void> {
        await this.actionObj.enterTIMSSiteCode(timsSiteCode);
    }

    @step("enter Site Decommissioning Data")
    async enterSiteDecommissioningData():Promise<void>  {
        await this.forcedDecommissioning.click();
        await this.page.getByRole('option', { name: 'Yes' }).locator('span').nth(1).click();
        await this.detailsOfDecommission.fill("test");
        await this.removalDateActiveEquipment.fill("09/15/2024");
        await this.removalDatePassiveEquipment.fill("09/15/2024");
    }
 
    @step("Select Reques type")
    async selectRequestType(requestType: string):Promise<void>  {
        switch (requestType) {

            case "removeUnusedEquipment":
                await this.removeUnusedEquipment.click();
                await this.actionObj.gotoNext();
                break;

            case "equipmentRelocation":
                await this.equipmentRelocation.click();
                await this.actionObj.gotoNext();
                break;

            case "higherPositiont":
                await this.higherPosition.click();
                await this.actionObj.gotoNext();
                break;

            case "signalRepeat":
                await this.signalRepeat.click();
                await this.actionObj.gotoNext();
                break;

            case "siteDecommissioning":
                await this.siteDecommissioning.click();
                await this.actionObj.gotoNext();
                break;

            case "siteOfferbyTowerCo":
                await this.siteOfferbyTowerCo.click();
                await this.actionObj.gotoNext();
                break;

            default:
                console.log("Unknown Request Selection.");
        }
    }

    @step("create Remove Unused Equipment Request")
    async createRemoveUnusedEquipmentRequest(customerAccount: string):Promise<void>  {
        await this.actionObj.enterCustomerAccount(customerAccount)
        await this.masterLeaseAgreement.click();
        await this.page.getByText('Yes').click();
        await this.thirdrdPartyInterest.click();
        await this.page.getByRole('option', { name: 'Yes' }).locator('span').nth(1).click();
        await this.HAndSRisk.click();
        await this.page.getByRole('option', { name: 'Yes' }).locator('span').nth(1).click()
        await this.removalDate.click();
        await this.page.getByRole('button', { name: '23' }).click();
        this.actionObj.saveRecord();
    }

    @step("create Equipment Relocation Request ")
    async createEquipmentRelocationRequest(customerAccount: string):Promise<void>  {
        await this.actionObj.enterCustomerAccount(customerAccount)
        await this.masterLeaseAgreement.click();
        await this.page.getByText('Yes').click();
        await this.actionObj.saveRecord();
    }
 
    @step("create Higher Position Request ")
    async createHigherPositionRequest(customerAccount: string):Promise<void>  {
        await this.actionObj.enterCustomerAccount(customerAccount)
        await this.masterLeaseAgreement.click();
        await this.page.getByText('Yes').click();
        await this.centerlineAvailable.fill('20');
        await this.spaceAvailable.fill('20');
        await this.actionObj.saveRecord();
    }
 
    @step("create Signal Repeat Request ")
    async createSignalRepeatRequest(customerAccount: string):Promise<void>  {
        await this.actionObj.enterCustomerAccount(customerAccount)
        await this.masterLeaseAgreement.click();
        await this.page.getByText('Yes').click();
        await this.actionObj.saveRecord();
    }

    @step("create Site Decommissioning Request")
    async createSSiteDecommissioningRequest(customerAccount: string, scopeOfWork: string):Promise<void> {
        await this.actionObj.enterCustomerAccount(customerAccount)
        await this.masterLeaseAgreement.click();
        await this.page.getByText('Yes').click();
        await this.actionObj.enterScopeOfWork(scopeOfWork);
        await this.enterSiteDecommissioningData();
        await this.actionObj.saveRecord();
    }

    @step("create Site Offer by Tower CoRequest ")
    async createSiteOfferbyTowerCoRequest(customerAccount: string, scopeOfWork: string):Promise<void>  {
        await this.actionObj.enterCustomerAccount(customerAccount)
        await this.masterLeaseAgreement.click();
        await this.page.getByText('Yes').click();
        await this.actionObj.enterSiteConfig();
        await this.actionObj.saveRecord();
    }

    @step("Submit the Request ")
    async submitTheRequest():Promise<void>  {
       await this.submitRequest.click( { timeout: 15000 });
       await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
       await this.submit.click( { timeout: 15000 });
       await expect(this.page.locator('.toastMessage')).toContainText('Request has been submitted.', { timeout: 20000 });
       //await expect(this.page.locator('records-highlights-details-item').filter({ hasText: 'In ProgressRequest Status' }).locator('lightning-formatted-text')).toBeVisible({ timeout: 15000 });
    }

}