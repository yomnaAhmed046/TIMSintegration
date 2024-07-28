import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import fs from 'fs';


const userLoginData = JSON.parse(fs.readFileSync('TestData-TIMS/userLoginData.json', 'utf8'));


let TIMSsiteCodeText: string | null ;
let pm;

test.describe("DE smart site integration", () => {

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    });
    

    test('create smart DE site in TIMS', async ({ page }) => {
        await pm.loginTIMS().navigateToURL(userLoginData.timsFullURL);
        await pm.loginTIMS().login(userLoginData.timsUsername, userLoginData.timsPassword);
        await pm.homePageTIMS().createNewSite();
        await pm.newsiteTIMS().createSmartDESite();
        const TIMSsiteCodeText = await pm.siteInfoTIMS().getTIMSCode();
        console.log("###### Site Code: " + TIMSsiteCodeText)
        await pm.siteInfoTIMS().updateDESmartSite(); 
        await pm.loginCommander().navigateToURL(userLoginData.commanderURL); 
        await pm.loginCommander().login(userLoginData.commanderUernameTxt, userLoginData.commanderPasswordTxt);
        await pm.quickAccessCommander().openPortal();
        await pm.homePageCommander().clickEntityMNG();
        await pm.entityMNGCommander().searchForSmartSite(TIMSsiteCodeText);
    })
})

