import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsProjectData from '../../TestData/TIMS/projectData.json'

let pm;

test.describe("DE Create new Projects", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    });

    test('@Regression The User can create new Project successfully', async ({ page }) => {
        await pm.projectTIMS().openProjectPage();
        await pm.projectTIMS().createProject(timsProjectData.projectTamplate);
        await expect(page.locator('.toastMessage')).toContainText('was created.', {timeout:15000});
        const appID = await pm.actionsTIMS().getCodeValue();
        console.log("###### Project ID: " + appID);
        await pm.actionsTIMS().addRecordtoExcel(appID, 2);
    })

})