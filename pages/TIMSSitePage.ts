import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import  Actions from '../pages/Actions';

export default class TIMSsiteInfoPage {
  readonly page: Page;
  readonly action: Actions;
  readonly sitesTab: Locator;
  readonly newSiteButton: Locator;
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
  readonly searchBoxforTIMSCode: Locator;
  readonly siteRecord: Locator;
  readonly createnewAppButton: Locator;
  readonly projectTab: Locator;
  //---------------------------------------------
  readonly siteNameTxt: Locator;
  readonly marketList: Locator;
  readonly DEmarketOption: Locator;
  readonly IEmarketOption: Locator;
  readonly smartSiteList: Locator;
  readonly YesSmartSiteOption: Locator;
  readonly companyCodeTXT: Locator;
  readonly IEcompanyCodeOption: Locator;
  readonly DEcompanyCodeOption: Locator;
  readonly lat: Locator;
  readonly long: Locator;
  readonly saveBtn: Locator;
  readonly Region: Locator;
  readonly Country: Locator;
  // ES
  readonly ESmarketOption: Locator;
  readonly EScompanyCodeOption: Locator;
  readonly ESRegion: Locator;
  readonly ESCountry: Locator;
  //IE
  readonly countryComboBox: Locator;
  readonly countryComboxBoxChoice: Locator;
  readonly countyTxtBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.action = new Actions(page);
    this.sitesTab = page.getByRole('button', { name: 'Sites List' });
    this.newSiteButton = page.getByRole('menuitem', { name: 'New Site' });
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
    this.siteRecord = page.getByRole('link', { name: 'DE-TIMS-100104' });
    this.searchBoxforTIMSCode = page.locator(`[name='Site-search-input']`);
    this.TIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: '-TIMS-' });
    this.createnewAppButton = page.locator('records-highlights-details-item').filter({ hasText: 'Start New ApplicationCreate' }).getByRole('link');
    this.projectTab = page.getByRole('tab', { name: 'Projects' });
    // ES 
    this.ESwindZoneOption = page.getByTitle('A', { exact: true });
    //------------------------------------------------
    this.siteNameTxt = page.locator('[name="Site_Name__c"]');
    this.marketList = page.getByRole('combobox', { name: 'Market' });
    this.DEmarketOption = page.getByRole('option', { name: 'DE', exact: true }).locator('span').nth(1);
    this.smartSiteList = page.getByRole('combobox', { name: 'Smart Site' });
    this.YesSmartSiteOption = page.getByRole('option', { name: 'Yes' });
    this.companyCodeTXT = page.getByPlaceholder('Search Company Code...');
    this.IEcompanyCodeOption = page.getByRole('option', { name: 'IE91 IE91' }).locator('span').nth(2);
    this.DEcompanyCodeOption = page.getByRole('option', { name: 'DE91 DE91' }).locator('span').nth(2);
    this.lat = page.getByLabel('*Lat');
    this.long = page.getByLabel('*Long');
    this.Region = page.getByRole('combobox', { name: 'Region (TDb)' });
    this.saveBtn = page.locator('.slds-button.slds-button_brand');
    // ES 
    this.ESmarketOption = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.EScompanyCodeOption = page.getByRole('option', { name: 'ES91 ES91' }).locator('span').nth(2);
    this.Country = page.getByRole('combobox', { name: 'Country' });
    this.ESCountry = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESRegion = page.getByRole('option', { name: 'R1' }).locator('span').nth(1);

    //IE
    this.IEmarketOption = page.locator('xpath=//*[@title="IE"]');
    this.IEcompanyCodeOption = page.getByRole('option', { name: 'IE91 IE91' }).locator('span').nth(2);
    this.countryComboBox = page.locator('[name="Country__c"]');
    this.countryComboxBoxChoice = page.getByTitle("IE").locator('nth=1');
    this.countyTxtBox = page.locator('[name="sitetracker__County__c"]');
  }

  //Function to get the tims code
  async getTIMSCode(): Promise<string> {
    const timsCode = await this.TIMSsiteCode.innerText();
    return timsCode;
  }

  async createNewSite() {
    await this.sitesTab.click();
    await this.newSiteButton.click();
  }

  async openSite(timsSiteCode: string) {
    await this.searchBoxforTIMSCode.fill(timsSiteCode);
    await this.searchBoxforTIMSCode.press('Enter');
    await this.siteRecord.click();
  }

  async createSmartDESite() {
    await this.siteNameTxt.fill("xx");
    await this.marketList.click();
    await this.DEmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("DE91");
    await this.DEcompanyCodeOption.click();
    await this.lat.fill("1.1");
    await this.long.fill("2.2");
    await this.saveBtn.click();
  }

  async createSmartESSite() {
    await this.siteNameTxt.fill("ES");
    await this.marketList.click();
    await this.ESmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.Country.click();
    await this.ESCountry.click();
    await this.Region.click();
    await this.ESRegion.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("ES91");
    await this.EScompanyCodeOption.click();
    await this.lat.fill("1.1");
    await this.long.fill("2.2");
    await this.saveBtn.click();
  }

  async createSmartIESite() {
    await this.siteNameTxt.fill("xx");
    await this.marketList.click();
    await this.IEmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("IE91");
    await this.IEcompanyCodeOption.click();
    await this.countryComboBox.click();
    await this.page.keyboard.type('I');
    await this.page.keyboard.press('Enter');
    //await this.countryComboxBoxChoice.click();
    await this.countyTxtBox.fill("county test");
    await this.lat.fill("1.1");
    await this.long.fill("2.2");
    await this.saveBtn.click();
  }

  async createNormalSite(siteName: string, companyCode: string, lat: string, long: string) {
    await this.siteNameTxt.fill(siteName);
    await this.action.enterCompanyCode(companyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.action.saveRecord();
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