import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsSiteData from '../../TestData/TIMS/siteData.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;
let page;

test.describe.serial("Create new Remove Unused Equipment Request then Submit the Request successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);

    })

    test("@Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
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

    test('@Regression 02.The User can create new Remove Unused Equipment Request successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Requests");
        ////await pm.requestTIMS().requestPage.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('removeUnusedEquipment');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createRemoveUnusedEquipmentRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue("R");
        console.log("###### Remove Unused Equipment Request: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression 03.The User Submit the Remove Unused Equipment Request successfully', async ({ }) => {
        await pm.requestTIMS().submitTheRequest();

    })
})
/////////////////////////////////////////////////
test.describe.serial("Create new Equipment Relocation Request then Submit the Request successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);

    })

    test("@Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
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

    test('@Regression 02.The User can create new Equipment Relocation Request successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Requests");
        //await pm.requestTIMS().requestPage.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('equipmentRelocation');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createEquipmentRelocationRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue("R");
        console.log("###### Equipment Relocation Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression 03.The User Submit the Remove Unused Equipment Request successfully', async ({ }) => {
        await pm.requestTIMS().submitTheRequest();

    })
})
////////////////////////////////////////////////
test.describe.serial("Create new Higher Position Request then Submit the Request successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);

    })

    test("@Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
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

    test('@Regression 02.The User can create new Higher Position  Request successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Requests");
        //await pm.requestTIMS().requestPage.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('higherPositiont');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createHigherPositionRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue("R");
        console.log("###### Higher Position Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression 03.The User Submit the Higher Position Request successfully', async ({ }) => {
        await pm.requestTIMS().submitTheRequest();

    })
})
///////////////////////////////////////////////
test.describe.serial("Create new Signal Repeat Request then Submit the Request successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);

    })

    test("@Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
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

    test('@Regression 02.The User can create new Signal Repeat Request successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Requests");
        //await pm.requestTIMS().requestPage.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('signalRepeat');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createSignalRepeatRequest(timsSiteData.customerAccount);
        const RequestID = await action.getCodeValue("R");
        console.log("###### Signal Repeat Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression 03.The User Submit the Signal Repeat Request successfully', async ({ }) => {
        await pm.requestTIMS().submitTheRequest();

    })
})
/////////////////////////////////////////////
test.describe.serial("Create new Site Decommissioning Request then Submit the Request successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);

    })

    test("@Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
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

    test('@Regression 02.The User can create new Site Decommissioning Request successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Requests");
        //await pm.requestTIMS().requestPage.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('siteDecommissioning');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createSSiteDecommissioningRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
        const RequestID = await action.getCodeValue("R");
        console.log("###### Site Decommissioning Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression 03.The User Submit the Signal Repeat Request successfully', async ({ }) => {
        await pm.requestTIMS().submitTheRequest();

    })
})
////////////////////////////////////////////
test.describe.serial("Create new Site Offer by TowerCo Request then Submit the Request successfully", () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pm = new PageManager(page);
        action = new Action(page);

    })

    test("@Regression 01.Login to TIMS successfully", async ({ baseURL }) => {
        ['--window-size=1920,1080'];
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

    test('@Regression 02.The User can create new Site Offer by TowerCo Request successfully', async ({ }) => {
        const env = test.info().project.name;
        const TIMSSiteCode = env == 'TIMSFULL' ? process.env.TIMSFULL_SITE_CODE: env == 'TIMSPARTIAL' ?  process.env.TIMSPARTIAL_SITE_CODE: process.env.PREPROD_SITE_CODE;
        await action.searchOpenObject("Requests");
        //await pm.requestTIMS().requestPage.click();
        await action.createNewObject();
        await pm.requestTIMS().selectRequestType('siteOfferbyTowerCo');
        await pm.requestTIMS().enterTIMSSiteCode(TIMSSiteCode);
        await pm.requestTIMS().createSiteOfferbyTowerCoRequest(timsSiteData.customerAccount, timsSiteData.scopeOfWork);
        const RequestID = await action.getCodeValue("R");
        console.log("###### Site Offer by TowerCo Request ID: " + RequestID);
        await action.addRecordtoExcel(RequestID, 3);
    })

    test('@Regression 03.The User Submit the Site Offer by TowerCo Request successfully', async ({ }) => {
        await pm.requestTIMS().submitTheRequest();

    })
})
