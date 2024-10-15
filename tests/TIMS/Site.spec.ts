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
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        // const env = test.info().project.name;
        // const username = env == 'TIMSFULL' ? process.env.TIMSFULL_USERNAME : process.env.TIMSPartial_USERNAME;
        // const password = env == 'TIMSFULL' ? process.env.TIMSFULL_PASSWORD : process.env.TIMSPartial_PASSWORD;
        // if (!username || !password) {
        //     throw new Error('Credentials are not defined for the current environment');
        // }
        // await pm.loginTIMS().navigateToURL(`${baseURL}`);
        // await pm.loginTIMS().login(username, password);

    });

    test('@Regression The User can create New Site successfully', async ({ }) => {
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createNormalSite(timsSiteData.siteName, timsSiteData.DEcompanyCode, timsSiteData.lat, timsSiteData.long);
        await expect(page.locator('.toastTitle')).toContainText("Record Created", { timeout: 10000 });
        TIMSsiteCode = await action.getCodeValue();
        console.log("The Site Code: " + TIMSsiteCode);
        await action.addRecordtoExcel(TIMSsiteCode, 0);
    })
})

test.describe("The User create the Objects from Site", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
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
        console.log("last record inside the test" + firstValueOfLastRecord);
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.modifyExistingSite);
        await pm.appTIMS().createModifyExistingSiteApp(timsAppData.customerAccount, timsAppData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test ('@Regression-The User can create Site Exit by Customer Application From Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.SiteExitbyCustomerApp);
        await pm.appTIMS().createSiteExitbyCustomerApp(timsAppData.customerAccount, timsAppData.scopeOfWork, timsAppData.removalDate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test('@Regression-The User can create New Co-location Site Application From Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.newCoLocatioApp);
        await pm.appTIMS().createNewColocationSiteApp(timsAppData.customerAccount, timsAppData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test ('@Regression-The User can create Project from Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().projectTab.click();
        await action.createNewObject();
        await pm.projectTIMS().createProject(timsProjectData.projectTamplate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:10000});
    })

    test ('@Regression-The User can create Candidate from Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().candidateTab.click();
        await action.createNewObject();
        await pm.candidateTIMS().createCandidate();
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:10000});
    })

    test ('@Regression-The User can create LeaseIn from Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseInfromSite();
    })

    test ('@Regression-The User can create Lease-Out Anchor Tenant from Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseOutAnchorTenantFromSite();
    })

    test ('@Regression-The User can create Lease-Out 3rd Party Tenant from Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseOutThirdPartyTenantFromSite();
    })

    test ('@Regression-The User can create GLBO from Site successfully', async ({ }) => {
        await pm.siteTIMS().openSite(firstValueOfLastRecord);
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewGLBOFromSite();
    })

    test ('@Regression-The User can Upload file from Site successfully', async ({ }) => {
        await pm.siteTIMS().uploadFilefromSite(firstValueOfLastRecord);
    })
    
})


