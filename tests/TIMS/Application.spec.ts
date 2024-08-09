import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsApplicationData from '../../TestData/TIMS/applicationDate.json'

let pm;

test.describe("DE Create new Applications with all Types ", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test ('@Regression The User can create Modify Existing Site Application successfully', async ({ page }) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.modifyExistingSite);
        await pm.actionsTIMS().enterTIMSSiteCode(timsApplicationData.TIMSSiteCode);
        await pm.appTIMS().createModifyExistingSiteApp(timsApplicationData.customerAccount , timsApplicationData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
        const appID = await pm.actionsTIMS().getCodeValue();
        console.log("###### Application ID: " + appID);
        await pm.actionsTIMS().addRecordtoExcel(appID,1);
    })

    test ('@Regression The User can create New BTS Application successfully', async ({ page }) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.newBTS);
        await pm.appTIMS().createNewBTSApp(timsApplicationData.customerAccount , timsApplicationData.scopeOfWork , timsApplicationData.lat, timsApplicationData.long, timsApplicationData.radius);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
        const appID = await pm.actionsTIMS().getCodeValue();
        console.log("###### Application ID: " + appID);
        await pm.actionsTIMS().addRecordtoExcel(appID,1);
    })

    test ('@Regression The User can create New Co-location Site Application successfully', async ({ page }) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.newCoLocatioApp);
        await pm.actionsTIMS().enterTIMSSiteCode(timsApplicationData.TIMSSiteCode);
        await pm.appTIMS().createNewColocationSiteApp(timsApplicationData.customerAccount , timsApplicationData.scopeOfWork);
        expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
        const appID = await pm.actionsTIMS().getCodeValue();
        console.log("###### Application ID: " + appID);
        await pm.actionsTIMS().addRecordtoExcel(appID,1);
    })

    test ('@Regression The User can create Site Exit by Customer Application successfully', async ({ page }) => {
        await pm.appTIMS().openApplicationPage();
        await pm.appTIMS().selectAppType(timsApplicationData.SiteExitbyCustomerApp);
        await pm.actionsTIMS().enterTIMSSiteCode(timsApplicationData.TIMSSiteCode);
        await pm.appTIMS().createSiteExitbyCustomerApp(timsApplicationData.customerAccount , timsApplicationData.scopeOfWork, timsApplicationData.removalDate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
        const appID = await pm.actionsTIMS().getCodeValue();
        console.log("###### Application ID: " + appID);
        await pm.actionsTIMS().addRecordtoExcel(appID,1);
    })
})