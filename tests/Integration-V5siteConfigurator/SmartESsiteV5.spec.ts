import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsSiteData from '../../TestData/TIMS/siteData.json'
import * as dotenv from 'dotenv';


let pm;
let timsUrl: string;
let timsUsername: string;
let timsPassword: string;
let commanderUrl: string;
let commanderUsername: string;
let commanderPassword: string;
dotenv.config();

test.describe("ES smart site integration with V5", async () => {

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        const timsEnv = (process.env.TIMS_ENV || 'test').trim();
        timsUrl = timsEnv === 'dev' ? process.env.TIMSPARTIAL_URL! : process.env.TIMSFULL_URL!;
        timsUsername = timsEnv === 'dev' ? process.env.TIMSPARTIAL_USERNAME! : process.env.TIMSFULL_USERNAME!;
        timsPassword = timsEnv === 'dev' ? process.env.TIMSPARTIAL_PASSWORD! : process.env.TIMSFULL_PASSWORD!;
        commanderUrl = process.env.COMMANDER_URL!;
        commanderUsername = process.env.COMMANDER_USERNAME!;
        commanderPassword = process.env.COMMANDER_PASSWORD!;
    })

    test("Create smart site in TIMS and search in V5", async ({ page }) => {
        //Create smart site in TIMS
        console.log('Navigating to TIMS URL: ', timsUrl);
        await pm.loginTIMS().navigateToURL(timsUrl);
        await pm.loginTIMS().login(timsUsername, timsPassword);
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createSmartESSite(timsSiteData.siteName,  timsSiteData.EScompanyCode, timsSiteData.lat, timsSiteData.long);
        const TIMSsiteCodeText = await pm.siteTIMS().getTIMSCode();
        console.log("###### Site Code in TIMS: " + TIMSsiteCodeText);
        await pm.siteTIMS().updateESSmartSite();

        //Get tims site status
        const timsSiteStatus = await pm.siteTIMS().getTimsSiteStaus();
        console.log("Site status in TIMS: " + timsSiteStatus);
        //Check for smart site in V5
        await pm.loginCommander().navigateToURL(commanderUrl);
        await pm.loginCommander().login(commanderUsername, commanderPassword);
        await pm.quickAccessCommander().openSiteConfigurator();
        await pm.v5LandingPage().searchForSmartSite(TIMSsiteCodeText);
        await pm.v5SiteInfoPage().checkSiteDetails();
        await expect(pm.v5SiteInfoPage().siteStatus).toBeVisible();
        await expect(pm.v5SiteInfoPage().siteStatus).toHaveText(timsSiteStatus);
        console.log("Site status in V5: " + await pm.v5SiteInfoPage().siteStatus.innerText());
        await expect(pm.v5SiteInfoPage().siteName).toHaveText(timsSiteData.siteName);
        console.log("Site Name in V5: " + await pm.v5SiteInfoPage().siteName.innerText());
        await expect(pm.v5SiteInfoPage().long).toHaveText(timsSiteData.long);
        console.log("Longitude in V5: " + await pm.v5SiteInfoPage().long.innerText());
        await expect(pm.v5SiteInfoPage().lat).toHaveText(timsSiteData.lat);
        console.log("Latitude in V5: " + await pm.v5SiteInfoPage().lat.innerText());
    })
})