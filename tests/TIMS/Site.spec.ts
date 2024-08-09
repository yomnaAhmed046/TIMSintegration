import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsSiteData  from '../../TestData/TIMS/siteData.json'

let pm;

test.describe("The Objects Created from Site", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test ('@Regression The User can create New Site successfully', async ({ page }) => {
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createNormalSite(timsSiteData.siteName, timsSiteData.companyCode, timsSiteData.lat, timsSiteData.long);
        await expect(page.locator('.toastTitle')).toContainText("Record Created", { timeout: 10000 });
        const TIMSsiteCode = await pm.siteTIMS().getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCode)
        await pm.actionsTIMS().addRecordtoExcel(TIMSsiteCode,0);
    })

})