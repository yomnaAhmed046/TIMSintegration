import { test, expect } from '@playwright/test'
import TIMSloginPage from '../pages/TIMS_loginPage';
import TIMShomePage from '../pages/TIMS_homePage';
import newSitePage from '../pages/TIMS_newSitePage';
import TIMSsiteInfoPage from '../pages/TIMS_siteInfoPage';
import CommanderLoginPage from '../pages/Commander-loginPage';
import CommanderQuickAccessPage from '../pages/Commander_QuickAccessPage';
import CommanderHomePage from '../pages/Commander_homePage';
import CommanderEntityMNGPage from '../pages/Commander-entityMNGpage';
import fs from 'fs';


const userLoginData = JSON.parse(fs.readFileSync('E2E-testData/userLoginData.json', 'utf8'));

let TIMSsiteCodeText: string | null ;
// let TIMSsiteCodeText: string | null = null;

test.describe("ES smart site integration", () => {

    let loginObj: TIMSloginPage;
    let homeObj: TIMShomePage;
    let ESsiteObj: newSitePage;
    let siteInfoObj: TIMSsiteInfoPage;

    let commanderLoginObj: CommanderLoginPage;
    let commaderQuickAccObj: CommanderQuickAccessPage;
    let commanderHomeObj: CommanderHomePage;
    let commanderEntityObj: CommanderEntityMNGPage;


    test.beforeEach(async ({ page }) => {
        loginObj = new TIMSloginPage(page);
        homeObj = new TIMShomePage(page);
        ESsiteObj = new newSitePage(page);
        siteInfoObj = new TIMSsiteInfoPage(page);

        commanderLoginObj = new CommanderLoginPage(page);
        commaderQuickAccObj = new CommanderQuickAccessPage(page);
        commanderHomeObj = new CommanderHomePage(page);
        commanderEntityObj = new CommanderEntityMNGPage(page , TIMSsiteCodeText); //check siteInfoObj if needed or not
          
    });

    test('create smart ES site in TIMS', async ({ page }) => {
        await loginObj.navigateToURL(userLoginData.timsFullURL);
        await loginObj.login(userLoginData.timsUsername, userLoginData.timsPassword);
        await homeObj.createNewSite();
        await ESsiteObj.createSmartESSite();
        await expect(siteInfoObj.ESTIMSsiteCode).toBeVisible({ timeout: 60000 });
        
 //////////////
        TIMSsiteCodeText = await siteInfoObj.ESTIMSsiteCode.textContent();
        console.log("###### Site Code: " + TIMSsiteCodeText)
////////////////

        await siteInfoObj.updateESSmartSite();
        
    })

   

    test("Find ES site in commander", async ({ page }) => {
        await commanderLoginObj.navigateToURL(userLoginData.commanderURL);
        await commanderLoginObj.login(userLoginData.commanderUernameTxt, userLoginData.commanderPasswordTxt);
        await commaderQuickAccObj.openPortal();
        await commanderHomeObj.clickEntityMNG();
        await commanderEntityObj.searchForSmartSite();

    // new branch
    console.log("test")
    })
 })

