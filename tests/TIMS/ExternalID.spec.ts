import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsExternalIDData from '../../TestData/TIMS/externalIdData.json'
import Actions from '../../utils/Actions';

let pm;
let action;
test.describe("DE Create new External ID", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        action = new Actions(page);
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test('@Regression The User can create new External ID successfully', async ({ page }) => {
        await action.searchOpenObject(timsExternalIDData.externalIDObject);
        await action.createNewObject();
        await pm.externalIDTIMS().createExternalID(timsExternalIDData.externalID,timsExternalIDData.customerAccount);
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:15000});
        const externalID = await action.getCodeValue("EID-");
        console.log("###### External ID: " + externalID);
        await action.addRecordtoExcel(externalID, 10);
    })

})