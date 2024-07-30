import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export default class TIMSsiteInfoPage extends BasePage {
  readonly siteStatusEditBtn: Locator;
  readonly siteStatusList: Locator;
  readonly siteStatusOption: Locator;
  readonly criticalSiteList: Locator;
  readonly criticalSiteYes: Locator;
  readonly windZoneList: Locator;
  readonly DEwindZoneOption: Locator;
  readonly saveBtn_Details: Locator;
  readonly territoryField: Locator;
  readonly territorySearch: Locator;
  readonly territoryOption: Locator;
  readonly saveBtn_Address: Locator;
  readonly TIMSsiteCode: Locator;
  readonly ESwindZoneOption: Locator;
  readonly windValidation: Locator;


  constructor(page: Page) {
    super(page)
    this.siteStatusEditBtn = page.locator('lightning-output-field').filter({ hasText: 'Site StatusSite Status Help' }).locator('lightning-formatted-text');
    this.siteStatusList = page.locator('[name="sitetracker__Site_Status__c"]');
    this.siteStatusOption = page.locator('span').filter({ hasText: 'Pipeline' }).first();
    this.criticalSiteList = page.locator('[name="Critical_Site__c"]');
    this.criticalSiteYes = page.locator('span').filter({ hasText: 'Yes' }).first();
    this.windZoneList = page.getByText('*Wind Zone', { exact: true });
    this.DEwindZoneOption = page.locator('span').filter({ hasText: '1' }).nth(1);
    this.saveBtn_Details = page.locator('form').filter({ hasText: 'VF Customer Sharing MarketVF' }).locator('button[name="update"]');
    this.territoryField = page.locator('lightning-output-field').filter({ hasText: 'Territory' }).locator('lightning-formatted-lookup');
    this.territorySearch = page.getByPlaceholder('Search Territories...');
    this.territoryOption = page.locator('span').filter({ hasText: 'New Test' }).nth(4);
    this.saveBtn_Address = page.locator('form').filter({ hasText: 'AddressAddressCountryCountry' }).locator('button[name="update"]');
    this.TIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: '-TIMS-' });
    // ES 
    this.ESwindZoneOption = page.getByTitle('A', { exact: true });
  }

  //Function to get the tims code
  async getTIMSCode(): Promise<string> {
    const timsCode = await this.TIMSsiteCode.innerText();
    return timsCode;
  }

  async updateDESmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.dblclick();
    await this.DEwindZoneOption.click();
    await this.TIMSsiteCode.click();
    await this.saveBtn_Details.click();
    await this.territoryField.dblclick();
    await this.territorySearch.fill("New Test");
    await this.territorySearch.click();
    await expect(this.territoryOption).toBeVisible();
    await this.territoryOption.click();
    await this.saveBtn_Address.click();
    await this.page.waitForTimeout(6000);
  }

  async updateESSmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.ESwindZoneOption.click();
    await this.saveBtn_Details.click();
    await expect(this.saveBtn_Details).not.toBeVisible();
  }

  async updateIESmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click({ timeout: 900 });
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.DEwindZoneOption.click();
    await this.saveBtn_Details.click();
    await expect(this.saveBtn_Details).not.toBeVisible();
    // await this.territoryField.dblclick();
    //await this.territorySearch.click();
    // await this.territoryOption.click();
    //await this.saveBtn_Address.click();
  }
}