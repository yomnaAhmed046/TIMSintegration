import { test, expect } from '@playwright/test'
import fs from 'fs';
import { PageManager } from '../../pages/PageManager';
import * as CommanderLoginData from '../../TestData/Commander/userLogin.json'
import * as  timsLoginData from '../../TestData/TIMS/userLogin.json'


//const timsLoginData = JSON.parse(fs.readFileSync('TestData/TIMS/userLogin.json', 'utf8'));
//const CommanderLoginData = JSON.parse(fs.readFileSync('TestData/Commander/userLogin.json', 'utf8'));
let pm;

test.describe("ES smart site integration", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
 
    });

    test('create smart ES site in TIMS', async ({ page }) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createSmartESSite();
        const TIMSsiteCode = await pm.siteTIMS().getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCode + "#########")
        await pm.siteTIMS().updateESSmartSite();
        await pm.loginCommander().navigateToURL(CommanderLoginData.commanderURL);
        await pm.loginCommander().login(CommanderLoginData.commanderUernameTxt, CommanderLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openPortal();
        await pm.homePageCommander().clickEntityMNG();
        await pm.entityMNGCommander().searchForSmartSite(TIMSsiteCode);
    })
 })