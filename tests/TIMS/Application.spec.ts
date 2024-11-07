import { test, expect, BrowserContext } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsApplicationData from '../../TestData/TIMS/applicationDate.json'
import Action from '../../utils/Actions'
// import * as dotenv from 'dotenv';

// dotenv.config();

let pm;
let action;
let page;

test.describe.serial("Create Modify Existing Site Applications then Submit and Approve successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
    })

    test("@LWC @Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
        const env = test.info().project.name;
        const username = env == 'TIMSFULL'
            ? process.env.TIMSFULL_USERNAME
            : env == 'TIMSPARTIAL'
                ? process.env.TIMSPARTIAL_BASE_URL
                : process.env.PREPROD_USERNAME;

        const password = env == 'TIMSFULL'
            ? process.env.TIMSFULL_PASSWORD
            : env == 'TIMSPARTIAL'
                ? process.env.TIMSPARTIAL_PASSWORD
                : process.env.PREPROD_PASSWORD;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);

    });

    test('@LWC @Regression 02.The User can create Modify Existing Site Application successfully', async ({ }) => {
        const env = test.info().project.name;
        // const TIMSSiteCode = env === 'TIMSFULL'? process.env.TTIMSFULL_SITE_CODE: env === 'TIMSPARTIAL'? process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : env == 'TIMSPARTIAL' ? process.env.TIMSPARTIAL_SITE_CODE : process.env.PREPROD_SITE_CODE;
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.modifyExistingSite);
        await action.enterTIMSSiteCode(TIMSSiteCode);
        await pm.appTIMS().createModifyExistingSiteApp(timsApplicationData.customerAccount, timsApplicationData.scopeOfWork);
        await pm.appTIMS().verfiySuccessMessage();
        const appID = await action.getCodeValue("A");
        console.log("The Modify Existing Site Application ID: " + appID);
        await action.addRecordtoExcel(appID, 1);
    })

    test('@LWC @Regression 03.The User Submit the Modify Existing Site Application for Approval successfully', async ({ }) => {
        await pm.appTIMS().submitForApproval();
    })

    test('@LWC @Regression 04.The User Approve the Modify Existing Site Application successfully', async ({ }) => {
        await pm.appTIMS().openWorkflowTab();
        await pm.appTIMS().approveApplication();
    })

})

test.describe.serial("Creat New BTS Application then Submit and Approve Successfully", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
    })

    test("@LWC @Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
        const env = test.info().project.name;
        const username = env == 'TIMSFULL'
            ? process.env.TIMSFULL_USERNAME
            : env == 'TIMSPARTIAL'
                ? process.env.TIMSPARTIAL_BASE_URL
                : process.env.PREPROD_USERNAME;

        const password = env == 'TIMSFULL'
            ? process.env.TIMSFULL_PASSWORD
            : env == 'TIMSPARTIAL'
                ? process.env.TIMSPARTIAL_PASSWORD
                : process.env.PREPROD_PASSWORD;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
    });

    test('@LWC @Regression 02.The User can create New BTS Application successfully', async ({ }) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.newBTS);
        await pm.appTIMS().createNewBTSApp(timsApplicationData.customerAccount, timsApplicationData.scopeOfWork, timsApplicationData.lat, timsApplicationData.long, timsApplicationData.radius)
        await pm.appTIMS().verfiySuccessMessage();
        const appID = await action.getCodeValue("A");
        console.log("The New BTS Application ID: " + appID);
        await action.addRecordtoExcel(appID, 1);
    })

    test('@LWC @Regression 03.The User Submit The New BTS Application for Approval successfully', async ({ }) => {
        await pm.appTIMS().submitForApproval();
    })

    test('@LWC @Regression 04.The User Approve The New BTS Application successfully', async ({ }) => {
        await pm.appTIMS().openWorkflowTab();
        await pm.appTIMS().approveApplication();
    })
})

test.describe.serial("Creat the New Co-location Site Application then Submit and Approve Successfully", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
    })

    test("@LWC @Regression-01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
        const env = test.info().project.name;
        const username = env == 'TIMSFULL'
            ? process.env.TIMSFULL_USERNAME
            : env == 'TIMSPARTIAL'
                ? process.env.TIMSPARTIAL_BASE_URL
                : process.env.PREPROD_USERNAME;

        const password = env == 'TIMSFULL'
            ? process.env.TIMSFULL_PASSWORD
            : env == 'TIMSPARTIAL'
                ? process.env.TIMSPARTIAL_PASSWORD
                : process.env.PREPROD_PASSWORD;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
    });

    test('@LWC @Regression-02.The User can create New Co-location Site Application successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.newCoLocatioApp);
        await action.enterTIMSSiteCode(TIMSSiteCode);
        await pm.appTIMS().createNewColocationSiteApp(timsApplicationData.customerAccount, timsApplicationData.scopeOfWork);
        expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 90000 });
        const appID = await action.getCodeValue("A");
        console.log("the New Co-location Site Application ID: " + appID);
        await action.addRecordtoExcel(appID, 1);
    })

    test('@LWC @Regression-03.The User Submit the New Co-location Site Application for Approval successfully', async ({ }) => {
        await pm.appTIMS().submitForApproval();
    })

    test('@LWC @Regression-04.The User Approve the the New Co-location Site Application successfully', async ({ }) => {
        await pm.appTIMS().openWorkflowTab();
        await pm.appTIMS().approveApplication();
    })
})

test.describe.serial("Creat Site Exit by Customer Application then Submit and Approve Successfully", () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
    })

    test("@LWC @Regression-01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
        const env = test.info().project.name;
        const username = env == 'TIMSFULL'
        ? process.env.TIMSFULL_USERNAME
        : env == 'TIMSPARTIAL'
            ? process.env.TIMSPARTIAL_BASE_URL
            : process.env.PREPROD_USERNAME;

    const password = env == 'TIMSFULL'
        ? process.env.TIMSFULL_PASSWORD
        : env == 'TIMSPARTIAL'
            ? process.env.TIMSPARTIAL_PASSWORD
            : process.env.PREPROD_PASSWORD;
        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
    });

    test('@LWC @Regression-02.The User can create Site Exit by Customer Application successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.SiteExitbyCustomerApp);
        await action.enterTIMSSiteCode(TIMSSiteCode);
        await pm.appTIMS().createSiteExitbyCustomerApp(timsApplicationData.customerAccount, timsApplicationData.scopeOfWork, timsApplicationData.removalDate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 90000 });
        const appID = await action.getCodeValue("A");
        console.log("the Site Exit by Customer Application ID: " + appID);
        await action.addRecordtoExcel(appID, 1);
    })

    test('@LWC @Regression-03.The User Submit the Site Exit by Customer Application for Approval successfully', async ({ }) => {
        await pm.appTIMS().submitForApproval();
    })

    test('@LWC @Regression-04.The User Approve The Site Exit by Customer Application successfully', async ({ }) => {
        await pm.appTIMS().openWorkflowTab();
        await pm.appTIMS().approveApplication();
    })
})