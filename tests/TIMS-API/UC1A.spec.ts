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
                ? process.env.TIMSPARTIAL_USERNAME
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

    test('@API-UC1A-The User can create new Project and triggered in Operation Log successfully', async ({ page }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await pm.reportTIMS().openReportPage();
        await pm.reportTIMS().openOperationLog();
        await pm.reportTIMS().searchByID("a023X00002GKSaMQAX");
        await pm.reportTIMS().selectFirstRecord();
    });

    // test('List All Frames in thje Pages ', async ({ page }) => {
    //     const env = test.info().project.name;
    //     // await pm.reportTIMS().openReportPage();
    //     // await pm.reportTIMS().openOperationLog();
    //     await pm.projectTIMS().selectRecord("P-861109");
    //     await pm.projectTIMS().updateProject();
    // });
})