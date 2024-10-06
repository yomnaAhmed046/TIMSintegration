import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData from '../../TestData/TIMS/siteData.json'
import * as timsAppData from '../../TestData/TIMS/applicationDate.json'
import * as timsProjectData from '../../TestData/TIMS/projectData.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config();

let pm;
let action;
let page;
let TIMSsiteCode: string;
let lastRecord;
let firstValueOfLastRecord;

test.describe("The User Create Site", () => {
    test.beforeAll(async ({ browser, baseURL }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
        // await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        // await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        const env = test.info().project.name;
        const username = env == 'TIMSFULL' ? process.env.TIMSFULL_USERNAME : process.env.TIMSPartial_USERNAME;
        const password = env == 'TIMSFULL' ? process.env.TIMSFULL_PASSWORD : process.env.TIMSPartial_PASSWORD;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);

    });

    test('@Regression The User can create New Site successfully', async ({ }) => {
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createNormalSite(timsSiteData.siteName, timsSiteData.DEcompanyCode, timsSiteData.lat, timsSiteData.long);
        await expect(page.locator('.toastTitle')).toContainText("Record Created", { timeout: 15000 });
        TIMSsiteCode = await action.getCodeValue();
        console.log("The Site Code: " + TIMSsiteCode);
        await action.addRecordtoExcel(TIMSsiteCode, 0);
    })
})

test.describe("The User create the Objects from Site", () => {
    test.beforeAll(async ({ browser,baseURL }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
        // await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        // await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        const env = test.info().project.name;
        const username = env == 'TIMSFULL' ? process.env.TIMSFULL_USERNAME : process.env.TIMSPartial_USERNAME;
        const password = env == 'TIMSFULL' ? process.env.TIMSFULL_PASSWORD : process.env.TIMSPartial_PASSWORD;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
        try {
            lastRecord = await action.readExcelFile('createdRecords.xlsx', 'Site');
            console.log('Last record:', lastRecord);
            firstValueOfLastRecord = lastRecord[0];
            console.log('First value of the last record:', firstValueOfLastRecord);
        } catch (error) {
            console.error('Error reading last record:', error);
        }
    });

    test ('@Regression-The User can create Modify Existing Site Application From Site successfully', async ({  }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        console.log("last record inside the test" + TIMSSiteCode);
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.modifyExistingSite);
        await pm.appTIMS().createModifyExistingSiteApp(timsAppData.customerAccount, timsAppData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test ('@Regression-The User can create Site Exit by Customer Application From Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.SiteExitbyCustomerApp);
        await pm.appTIMS().createSiteExitbyCustomerApp(timsAppData.customerAccount, timsAppData.scopeOfWork, timsAppData.removalDate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test('@Regression-The User can create New Co-location Site Application From Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.newCoLocatioApp);
        await pm.appTIMS().createNewColocationSiteApp(timsAppData.customerAccount, timsAppData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test ('@Regression-The User can create Project from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().projectTab.click();
        await action.createNewObject();
        await pm.projectTIMS().createProject(timsProjectData.projectTamplate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:10000});
    })

    test ('@Regression-The User can create Candidate from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().candidateTab.click();
        await action.createNewObject();
        await pm.candidateTIMS().createCandidate();
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:10000});
    })

    test ('@Regression-The User can create LeaseIn from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseInfromSite();
    })

    test ('@Regression-The User can create Lease-Out Anchor Tenant from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseOutAnchorTenantFromSite();
    })

    test ('@Regression-The User can create Lease-Out 3rd Party Tenant from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseOutThirdPartyTenantFromSite();
    })

    test ('@Regression-The User can create GLBO from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewGLBOFromSite();
    })

    test ('@Regression-The User can create new Remove Unused Equipment Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().requestTab.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('removeUnusedEquipment');
        await pm.requestTIMS().createRemoveUnusedEquipmentRequest(timsSiteData.customerAccount);
    })

    test ('@Regression-The User can create new Equipment Relocation Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().requestTab.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('equipmentRelocation');
        await pm.requestTIMS().createEquipmentRelocationRequest(timsSiteData.customerAccount);
    })

    test ('@Regression-The User can create new Higher Position Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().requestTab.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('higherPositiont');
        await pm.requestTIMS().createHigherPositionRequest(timsSiteData.customerAccount);
    })

    test ('@Regression-The User can create new Signal Repeat Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().requestTab.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('signalRepeat');
        await pm.requestTIMS().createSignalRepeatRequest(timsSiteData.customerAccount);
    })

    test ('@Regression-The User can create new Site Decommissioning Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().requestTab.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('siteDecommissioning');
        await pm.requestTIMS().createSSiteDecommissioningRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
    })

    test ('@Regression-The User can create new Site Offer by TowerCo Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await pm.siteTIMS().requestTab.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('siteOfferbyTowerCo');
        await pm.requestTIMS().createSiteOfferbyTowerCoRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
    })


    test ('@Regression-The User can Upload file from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().uploadFilefromSite(TIMSSiteCode);
    })

    test('@Regression-The User can Create Site contact from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await action.moreTabs.click();
        await pm.siteTIMS().siteContactTab.click();
        await action.createNewObject();
        await action.saveRecord();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test('@Regression-The User can Create Site Access Request from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        await action.moreTabs.click();
        await pm.siteTIMS().accessTab.click();
        await action.createNewObject();
        await action.saveRecord();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test('@Regression-The User can Create Job from Site successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        await pm.siteTIMS().openSite(TIMSSiteCode);
        //await action.moreTabs.click();
        await pm.siteTIMS().jobTab.click();
        await action.createNewObject();
        await pm.jobsTIMS().createJob("AutoJob");
        await action.saveRecord();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })
})


