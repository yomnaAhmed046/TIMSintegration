import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import fs from 'fs';

const timsLoginData = JSON.parse(fs.readFileSync('TestData/TIMS/userLogin.json', 'utf8'));
const CommanderLoginData = JSON.parse(fs.readFileSync('TestData/Commander/userLogin.json', 'utf8'));
let pm;

test.describe("DE smart site integration", () => {

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    });
    
    test('create smart DE site in TIMS', async ({ page }) => {
        await pm.loginTIMS().navigateToURL(timsLoginData.timsFullURL);
        await pm.loginTIMS().login(timsLoginData.timsUsername, timsLoginData.timsPassword);
        await pm.homePageTIMS().createNewSite();
        await pm.newsiteTIMS().createSmartDESite();
        const TIMSsiteCodeText = await pm.siteInfoTIMS().getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCodeText)
        await pm.siteInfoTIMS().updateDESmartSite(); 
        await pm.loginCommander().navigateToURL(CommanderLoginData.commanderURL); 
        await pm.loginCommander().login(await CommanderLoginData.commanderUernameTxt, await CommanderLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openPortal();
        await pm.homePageCommander().clickEntityMNG();
        await pm.entityMNGCommander().searchForSmartSite(TIMSsiteCodeText);
    })
})