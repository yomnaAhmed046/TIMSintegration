import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import * as timsLoginData from '../../TestData/TIMS/userLogin.json'
import * as timsProjectData from '../../TestData/TIMS/projectData.json'
import Action from '../../utils/Actions'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

let pm;
let action;

test.describe("DE Create new Projects", () => {
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

     test('@LWC @Regression-User can Create LeaseIn', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewLeaseIn();
          const LeaseID = await action.getCodeValue("ST-Lease-");
          //await expect(LeaseID).toContainText('ST-Lease-');
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
          await pm.leaseTIMS().vervifyAutoCreatedProect("Lease-in New Contract");
     });

     test('@LWC @Regression-User can Create Lease-Out Anchor Tenant', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewLeaseOutAnchorTenant();
          const LeaseID = await action.getCodeValue("ST-Lease-");
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
          await pm.leaseTIMS().vervifyAutoCreatedProect("Lease-out MVP");
     });

     test('@LWC @Regression-User can Create Lease-Out 3rd Party Tenant', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewLeaseOut3rdPartyTenant();
          const LeaseID = await action.getCodeValue("ST-Lease-");
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
          await pm.leaseTIMS().vervifyAutoCreatedProect("Lease-out MVP");
     });

     test('@LWC @Regression-User can Create GLBO', async ({ page }) => {
          await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().createNewGLBO();
          const LeaseID = await action.getCodeValue("ST-Lease-");
          console.log("###### Lease ID: " + LeaseID);
          await action.addRecordtoExcel(LeaseID, 4);
          await pm.leaseTIMS().vervifyAutoCreatedProect("GLBO");
     });

     test('@LWC @Regression- User can Create New Project from Lease', async ({ page }) => {
          //await action.searchOpenObject("Leases");
          await pm.leaseTIMS().leaseButton.click();
          await pm.leaseTIMS().openLease("ST-Lease-201227");
          //await pm.leaseTIMS().openLeasePage();
          await pm.leaseTIMS().projectTab.click();
          await action.createNewObject();
          await pm.projectTIMS().createProject(timsProjectData.projectTamplate);
          await expect(page.locator('.toastMessage')).toContainText('was created.', { timeout: 10000 });
     });

})