import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';
import * as timsSiteData from '../../TestData/TIMS/siteData.json';
//import { authenticate } from './auth.setup';
//import { authenticate } from '../TIMS/auth.setup'; 



dotenv.config(); // Load environment variables from .env file

let pm;
let action;
let leaseID;

test.describe("CZ Create new Rental Object ", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        // ['--window-size=1920,1080'];
        // pm = new PageManager(page);
        // action = new Action(page);
        // const env = test.info().project.name;
        // await pm.loginTIMS().navigateToURL(process.env.TIMSFULL_BASE_URL);
        // await pm.loginTIMS().login(process.env.TIMSFULL_USERNAME_CZ, process.env.TIMSFULL_PASSWORD_CZ);
    });

    test('@Regression-The User can create new Rental Object successfully', async ({ page }) => {
        const env = test.info().project.name;

        //Create New Site
        await pm.siteTIMS().createNewSite();
        await pm.siteTIMS().createCZSite(timsSiteData.siteName, "CZ91", timsSiteData.lat, timsSiteData.long);
        await expect(page.locator('.toastTitle')).toContainText("Record Created", { timeout: 15000 });
        //--------------------------------------------------------------------------
        //await pm.siteTIMS().openSite("CZ-TIMS-101261");

        // //Create Rental Object with Company code
        // await pm.siteTIMS().rentalObjectBtn.click();
        // await page.pause();
        // await pm.rentalObjectTIMS().selectTIMSCompanyCode();
        // await page.pause();

        //Create Rental Object without LeaseIn
        await pm.rentalObjectTIMS().createRentalObjectWithoutLease();

        //Create new Lease In
        await pm.siteTIMS().leaseTab.click();
        await action.createNewObject();
        await pm.siteTIMS().createNewLeaseInfromSite();

        //Back to the site
        await pm.rentalObjectTIMS().navigateToSite();

        //enter Business entity Name
        await pm.siteTIMS().rentalObjectTab.click();
        await pm.rentalObjectTIMS().enterBusinessEnitityName();

        //Navigate to Site and create Rental Object
        await pm.siteTIMS().rentalObjectBtn.click();
        //await action.enterCZCompanyCode("CZ91");
        //await action.gotoNext();
        await pm.rentalObjectTIMS().createRentalObject();

        //Send the Rental Object to EVO
        await pm.rentalObjectTIMS().sendROtoEVO();
        const ROID = await action.getCodeValue();
        console.log("###### Rental Object ID: " + ROID);
        await action.addRecordtoExcel(ROID, 9);
    })
})