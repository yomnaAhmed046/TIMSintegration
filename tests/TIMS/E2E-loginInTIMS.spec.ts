import { test } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import timsLoginData from '../../TestData/TIMS/userLogin.json'

let pm;

test.describe("Login in TIMS", () => {
    test.beforeEach(async ({ page }) => {
        ['--window-size=1920,1080'];
        pm = new PageManager(page);
    });

    test('The user should login successfully in TIMS', async ({ page }) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    })
 })