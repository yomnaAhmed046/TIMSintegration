import { Page, Locator, FrameLocator } from 'playwright';
import { expect } from '@playwright/test';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';
import { LoadFnOutput } from 'module';

export default class TIMSLeasePage {
  readonly page: Page;
  readonly actionObj: Actions;
  readonly leaseButton: Locator;
  readonly createNewButton: Locator;
  readonly leaseSelection: Locator;
  readonly select: Locator;
  readonly leaseOutAnchorTenant: Locator;
  readonly leaseOut3rdPartyTenant: Locator;
  readonly GLBO: Locator;
  readonly frame: FrameLocator;
  readonly market: Locator;
  readonly projectTab: Locator;
  readonly projctNumber: Locator;
  readonly leaseInproject: Locator;
  readonly mVPProject: Locator;
  readonly gLBOProject: Locator;
  readonly searchBoxforLease: Locator;
  //readonly createNewNButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.actionObj = new Actions(this.page);
    this.leaseButton = page.getByTitle('Leases');
    //this.createNewButton = page.getByText('value="Create New"');
    this.frame = page.frameLocator('//iframe[contains(@name,"vfFrameId")]').nth(1);
    this.select = this.frame.getByLabel('*Lease Type');
    this.market = this.frame.getByLabel('Market');
    this.createNewButton = this.frame.getByRole('button', { name: 'Create New' });
    this.projectTab = page.getByRole('tab', { name: 'Projects' });
    this.projctNumber = page.getByRole('link', { name: 'Projects (1)' });
    // this.leaseInproject = page.getByRole('link', { name: 'Lease-in New Contract' });
    // this.gLBOProject = page.getByRole('link', { name: 'GLBO' });
    // this.mVPProject = page.getByRole('link', { name: 'Lease-out MVP' });
    this.searchBoxforLease = page.getByPlaceholder('Search this list...');

  }

  @step("open the Lease Page")
  async openLeasePage() {
    await this.leaseButton.click();
    //this.actionObj.createNewObject();
    await this.page.getByRole('button', { name: 'New' }).click();
  }

  @step("Create new LeaseIn Tenant")
  async createNewLeaseIn() {
    await this.select.selectOption('Lease_In');
    await this.market.selectOption('DE');
    await this.createNewButton.click();
  }

  @step("Create new Out Anchor Tenant")
  async createNewLeaseOutAnchorTenant() {
    await this.select.selectOption('Lease-Out Anchor Tenant');
    await this.market.selectOption('DE');
    await this.createNewButton.click();
  }

  @step("Create new Out 3rd Party Tenant Lease")
  async createNewLeaseOut3rdPartyTenant() {
    await this.select.selectOption('Lease-Out 3rd Party Tenant');
    await this.market.selectOption('DE');
    await this.createNewButton.click();
  }

  @step("Create new GLBO Lease")
  async createNewGLBO() {
    await this.select.selectOption('GLBO');
    await this.market.selectOption('DE');
    await this.createNewButton.click();
  }

  @step("Select the Lease Type")
  async selectLeaseType(leaseType: string) {
    switch (leaseType) {
      case "leaseIn":
        break;

      case "leaseOutAnchorTenant":
        break;

      case "leaseOut3rdPartyTenant":
        break;

      case "GLBO":
        break;

      default:
        console.log("Unknown Lease Selection.");
    }
  }

  @step("Verfiy the Project is Auto-Created when the Lease is created")
  async vervifyAutoCreatedProject(projectType: string) {
    this.projectTab.click();
    //await expect(this.page.getByRole('link', { name: 'P-' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: `${projectType}` })).toBeVisible();
    //getByRole('link', { name: 'P-' })
    //locator('lightning-output-field').filter({ hasText: 'Lease NameST-Lease-201142' }).locator('lightning-formatted-text')
    //getByText('DraftStatus', { exact: true }).nth(2)
  }

  async openLease(LeaseID: string): Promise<void> {
    await this.searchBoxforLease.fill(LeaseID);
    await this.searchBoxforLease.press('Enter');
    await this.page.getByRole('link', { name: LeaseID}).click();
    //this.siteRecord.click();
  }
}