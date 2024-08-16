import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData  from '../../TestData/TIMS/siteData.json'
import * as timsAppData from '../../TestData/TIMS/applicationDate.json'
import * as timsProjectData from '../../TestData/TIMS/projectData.json'
import Action from '../../utils/Actions'

let pm;
let action;

test.describe("The Objects Created from Site", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        action = new Action(page);
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test ('@Regression The User can create New Site successfully', async ({ page }) => {
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createNormalSite(timsSiteData.siteName, timsSiteData.DEcompanyCode, timsSiteData.lat, timsSiteData.long);
        await expect(page.locator('.toastTitle')).toContainText("Record Created", { timeout: 10000 });
        const TIMSsiteCode = await action.getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCode)
        await action.addRecordtoExcel(TIMSsiteCode,0);
    })

    test ('@Regression The User can create Modify Existing Site Application From Site successfully', async ({ page }) => {
        await pm.siteTIMS().openSite(timsSiteData.timsSiteCode);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.modifyExistingSite);
        await pm.appTIMS().createModifyExistingSiteApp(timsAppData.customerAccount, timsAppData.scopeOfWork);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })

    test ('@Regression The User can create Site Exit by Customer Application From Site successfully', async ({ page }) => {
        await pm.siteTIMS().openSite(timsSiteData.timsSiteCode);
        await pm.siteTIMS().createnewAppButton.click();
        await pm.appTIMS().selectAppType(timsAppData.SiteExitbyCustomerApp);
        await pm.appTIMS().createSiteExitbyCustomerApp(timsAppData.customerAccount, timsAppData.scopeOfWork, timsAppData.removalDate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
    })


    test ('@Regression The User can create Project from Site successfully', async ({ page }) => {
        await pm.siteTIMS().openSite(timsSiteData.timsSiteCode);
        await pm.siteTIMS().projectTab.click();
        await action.createNewObject();
        await pm.projectTIMS().createProject(timsProjectData.projectTamplate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:10000});
    })
    
})