import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as structureEquipmentData from '../../TestData/TIMS/structureEquipment.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Structure Equipments Successfully.", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        ['--window-size=1920,1080'];
        pm = new PageManager(page);
        action = new Action(page);
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

    test('@Regression-The User can create new Structure Equipment (Antenna) successfully', async ({ page }) => {
        const env = test.info().project.name;
        await action.searchOpenObject("Structure Equipment");
        await action.createNewObject();
        //await pm.strucureEquipmenttTIMS().selectEquipmentType(structureEquipmentData.Cabling);
        await pm.strucureEquipmenttTIMS().createStructureEquipment();
        await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 90000 });
        const structureEqupmentID = await action.getCodeValue("E-");
        console.log("###### Project ID: " + structureEqupmentID);
        await action.addRecordtoExcel(structureEqupmentID, 11);
    })
})