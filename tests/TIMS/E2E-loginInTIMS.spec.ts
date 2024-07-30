import {test, expect} from '@playwright/test'
import fs from 'fs';
import { PageManager } from '../../pages/PageManager';

const timsLoginData = JSON.parse(fs.readFileSync('TestData/TIMS/userLogin.json', 'utf8'));
let pm;

test.describe("Login in TIMS", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
 
    });

    test('The user should login successfully in TIMS', async ({ page }) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
    })
 })