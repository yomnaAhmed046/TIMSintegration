import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsApplicationData from '../../TestData/TIMS/applicationDate.json'
import Action from '../../utils/Actions'

let pm;
let action;
let page;

test.describe.serial("Create Modify Existing Site Applications then Submit and Approve successfully", () => { 
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);
    })
    test("01.Login to TIMS successfully", async ({ }) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test('02.The User can create Modify Existing Site Application successfully', async ({ }) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.modifyExistingSite);
        await action.enterTIMSSiteCode(timsApplicationData.TIMSSiteCode);
        await pm.appTIMS().createModifyExistingSiteApp(timsApplicationData.customerAccount, timsApplicationData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
        const appID = await action.getCodeValue();
        console.log("###### Application ID: " + appID);
        await action.addRecordtoExcel(appID, 1);
    })

    test('03.The User Submit the Modify Existing Site Application for Approval successfully', async ({}) => {
        await pm.appTIMS().submitForApproval();
    })

    test('04.The User Approve the Modify Existing Site Application successfully', async ({ }) => {
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

    test("01.Login to TIMS successfully", async ({}) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test ('02.The User can create New BTS Application successfully', async ({}) => {
            await pm.appTIMS().openApplicationPage();
            await pm.appTIMS().selectAppType(timsApplicationData.newBTS);
            await pm.appTIMS().createNewBTSApp(timsApplicationData.customerAccount, timsApplicationData.scopeOfWork,timsApplicationData.lat,timsApplicationData.long,timsApplicationData.radius)
            await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
            const appID = await action.getCodeValue();
            console.log("###### Application ID: " + appID);
            await action.addRecordtoExcel(appID,1);
        })

    test('03.The User Submit The New BTS Application for Approval successfully', async ({}) => {
        await pm.appTIMS().submitForApproval();
    })

    test('04.The User Approve The New BTS Application successfully', async ({ }) => {
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

    test("01.Login to TIMS successfully", async ({}) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test ('02.The User can create New Co-location Site Application successfully', async ({}) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.newCoLocatioApp);
        await action.enterTIMSSiteCode(timsApplicationData.TIMSSiteCode);
        await pm.appTIMS().createNewColocationSiteApp(timsApplicationData.customerAccount , timsApplicationData.scopeOfWork);
        expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
        const appID = await action.getCodeValue();
        console.log("###### Application ID: " + appID);
        await action.addRecordtoExcel(appID,1);
    })

    test('03.The User Submit the New Co-location Site Application for Approval successfully', async ({}) => {
        await pm.appTIMS().submitForApproval();
    })

    test('04.The User Approve the the New Co-location Site Application successfully', async ({ }) => {
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

    test("01.Login to TIMS successfully", async ({}) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test ('@Regression The User can create Site Exit by Customer Application successfully', async ({}) => {
            await pm.appTIMS().openApplicationPage();
            await pm.appTIMS().selectAppType(timsApplicationData.SiteExitbyCustomerApp);
            await action.enterTIMSSiteCode(timsApplicationData.TIMSSiteCode);
            await pm.appTIMS().createSiteExitbyCustomerApp(timsApplicationData.customerAccount , timsApplicationData.scopeOfWork, timsApplicationData.removalDate);
            await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
            const appID = await action.getCodeValue();
            console.log("###### Application ID: " + appID);
            await action.addRecordtoExcel(appID,1);
        })

    test('03.The User Submit the Site Exit by Customer Application for Approval successfully', async ({}) => {
        await pm.appTIMS().submitForApproval();
    })

    test('04.The User Approve The Site Exit by Customer Application successfully', async ({ }) => {
        await pm.appTIMS().openWorkflowTab();
        await pm.appTIMS().approveApplication();
    })
})