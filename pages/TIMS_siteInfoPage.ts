import { Page, Locator } from 'playwright';


export default class TIMSsiteInfoPage {
  readonly page: Page;
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



  constructor(page: Page) {
    this.page = page;
    
    this.siteStatusEditBtn = page.locator('lightning-output-field').filter({ hasText: 'Site StatusSite Status Help' }).locator('lightning-formatted-text');
    this.siteStatusList = page.getByLabel('Site Status - Current');
    this.siteStatusOption = page.locator('span').filter({ hasText: 'Pipeline' }).first();
    this.criticalSiteList = page.getByLabel('Critical Site (TDb) - Current');
    this.criticalSiteYes = page.locator('span').filter({ hasText: 'Yes' }).first();
    this.windZoneList = page.getByLabel('Wind Zone - Current Selection: --None--', { exact: true });
    this.DEwindZoneOption = page.locator('span').filter({ hasText: '1' }).first();
    this.saveBtn_Details = page.locator('form').filter({ hasText: 'VF Customer Sharing' }).locator('button[name="update"]');
    this.territoryField = page.locator('lightning-output-field').filter({ hasText: 'Territory' }).locator('lightning-formatted-lookup');
    this.territorySearch = page.getByPlaceholder('Search Territories...');
    this.territoryOption = page.locator('span').filter({hasText: 'New Test'}).nth(1);
    this.saveBtn_Address = page.locator('form').filter({ hasText: 'AddressAddressCountryCountry' }).locator('button[name="update"]');
    this.TIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'DE-TIMS-' });
  }

  async updateDESmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.DEwindZoneOption.click();
    await this.saveBtn_Details.click();
    await this.territoryField.dblclick();
    await this.territorySearch.fill("New Test");
    // await this.territorySearch.click();
    await this.territoryOption.click();
    await this.saveBtn_Address.click();
  }
}