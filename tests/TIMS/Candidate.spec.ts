import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Candidate", () => {
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

    test('@LWC @Regression-The User can create new Candidate successfully', async ({ page }) => {
       // await pm.cadidateObj.openCandidatePage();
        await action.searchOpenObject("Candidates");
        //await pm.cadidateObj.candidatePage.click();
        await pm.cadidateObj.openNewCandidate();
        await pm.cadidateObj.createCandidate();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 15000 });
        const candidateID = await action.getCodeValue("Auto test");
        console.log("###### Candidate ID: " + candidateID);
        await action.addRecordtoExcel(candidateID, 5);
    })

})