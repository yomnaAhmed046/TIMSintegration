import { test, expect } from '@playwright/test'
import fs from 'fs';
import { PageManager } from '../../pages/PageManager';

const timsLoginData = JSON.parse(fs.readFileSync('TestData/TIMS/userLogin.json', 'utf8'));
const CommanderLoginData = JSON.parse(fs.readFileSync('TestData/Commander/userLogin.json', 'utf8'));
let pm;


test.describe("IE smart site integration", () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    })

    test('create smart IE site in TIMS', async ({ page }) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.homePageTIMS().createNewSite();
        await pm.newsiteTIMS().createSmartIESite();
        const TIMSsiteCode = await pm.siteInfoTIMS().getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCode + "#########")
        await pm.siteInfoTIMS().updateIESmartSite();
        await pm.loginCommander().navigateToURL(CommanderLoginData.commanderURL);
        await pm.loginCommander().login(CommanderLoginData.commanderUernameTxt, CommanderLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openPortal();
        await pm.homePageCommander().clickEntityMNG();
        await pm.entityMNGCommander().searchForSmartSite();
    })
})