import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Job ", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        pm = new PageManager(page);
        action = new Action(page);
        const env = test.info().project.name;
        const username = env == 'TIMSFULL' ? process.env.TIMSFULL_USERNAME : process.env.TIMSPartial_USERNAME;
        const password = env == 'TIMSFULL' ? process.env.TIMSFULL_PASSWORD : process.env.TIMSPartial_PASSWORD;

        if (!username || !password) {
            throw new Error('Credentials are not defined for the current environment');
        }
        // await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        // await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.loginTIMS().navigateToURL(`${baseURL}`);
        await pm.loginTIMS().login(username, password);
    });

    test('@Regression-The User can create new Site Access Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE : process.env.TIMSPARTIAL_SITE_CODE;
        //await action.searchOpenObject("Jobs");
        await pm.jobsTIMS().jobPage.click();
        await action.createNewObject();
        await pm.jobsTIMS().createCandidate("Auto Job");
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
        const jobID = await action.getCodeValue();
        console.log("###### Site Contact ID: " + jobID);
        await action.addRecordtoExcel(jobID, 7);
    })

})