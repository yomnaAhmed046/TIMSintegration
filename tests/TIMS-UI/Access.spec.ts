import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Site Access Request", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        ['--window-size=1920,1080'];
        pm = new PageManager(page);
        action = new Action(page);
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

    test('@Regression-The User can create new Site Access Request successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Site Access Requests");
        //await pm.accessTIMS().accessPage.click();
        await action.createNewObject();
        await action.enterTIMSSiteCode(TIMSSiteCode);
        await action.saveRecord();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
        const siteAccess = await action.getCodeValue("REQ");
        console.log("###### Site Contact ID: " + siteAccess);
        await action.addRecordtoExcel(siteAccess, 8);
    })

})