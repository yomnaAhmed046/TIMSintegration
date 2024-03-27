import { Page, Locator } from 'playwright';


export default class TIMSsiteInfoPage {
  readonly page: Page;
  readonly siteStatusEditBtn: Locator;
  readonly siteStatusList: Locator;
  readonly siteStatusOption: Locator;
  readonly criticalSiteList: Locator;
  readonly criticalSiteYes: Locator;
  readonly windZoneList: Locator;
  readonly windZoneOption: Locator;
  readonly saveBtn_Details: Locator;
  readonly territoryField: Locator;
  readonly territorySearch: Locator;
  readonly territoryOption: Locator;
  readonly saveBtn_Address: Locator;
  readonly TIMSsiteCode: Locator;



  constructor(page: Page) {
    this.page = page;
    this.siteStatusEditBtn = page.locator('div:nth-child(5) > .slds-grid > button').first();
    this.siteStatusList = page.getByLabel('Site Status (TDb) - Current');
    this.siteStatusOption = page.locator('span').filter({ hasText: 'Pipeline' }).first();
    this.criticalSiteList = page.getByLabel('Critical Site (TDb) - Current');
    this.criticalSiteYes = page.locator('span').filter({ hasText: 'Yes' }).first();
    this.windZoneList = page.getByLabel('Wind Zone - Current Selection: --None--', { exact: true });
    this.windZoneOption = page.locator('span').filter({ hasText: '1' }).first();
    this.saveBtn_Details = page.locator('form').filter({ hasText: 'VF Customer Sharing' }).locator('button[name="update"]');
    this.territoryField = page.locator('lightning-output-field').filter({ hasText: 'Territory (TDb)' }).locator('lightning-formatted-lookup');
    this.territorySearch = page.getByPlaceholder('Search Territories...');
    this.territoryOption = page.getByLabel('Recent Territories').locator('span').nth(2);
    this.saveBtn_Address = page.locator('form').filter({ hasText: 'AddressAddressCountryCountry' }).locator('button[name="update"]');
    this.TIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'DE-TIMS-' });
  }

  async updateSmartSite() {
    await this.siteStatusEditBtn.click();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.windZoneOption.click();
    await this.saveBtn_Details.click();
    await this.territoryField.dblclick();
    await this.territorySearch.click();
    await this.territoryOption.click();
    await this.saveBtn_Address.click();

  }

  getTIMSsiteCode(): Locator {
    return this.TIMSsiteCode;
  }
}