import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';
import  Actions from '../utils/Actions';
import {step} from '../utils/StepDecorator';

export default class TIMSsiteInfoPage {
  readonly page: Page;
  readonly action: Actions;

  //Header Elements
  readonly sitesTab: Locator;
  readonly newSiteButton: Locator;

  //Create site elements
  readonly siteNameTxt: Locator;
  readonly marketList: Locator;
  readonly smartSiteList: Locator;
  readonly YesSmartSiteOption: Locator;
  readonly lat: Locator;
  readonly long: Locator;
  readonly saveBtn: Locator;
  readonly Region: Locator;
  readonly Country: Locator;
  
  //Update site elements
  readonly siteStatusEditBtn: Locator;
  readonly siteStatusList: Locator;
  readonly siteStatusOption: Locator;
  readonly criticalSiteList: Locator;
  readonly criticalSiteYes: Locator;
  readonly windZoneList: Locator;
  readonly saveBtn_Details: Locator;
  readonly saveBtn_Address: Locator;
  readonly TIMSsiteCode: Locator;
  //----------------------------------
  readonly searchBoxforTIMSCode: Locator;
  readonly siteRecord: Locator;
  readonly createnewAppButton: Locator;
  readonly projectTab: Locator;
  
  //DE 
  readonly DEmarketOption: Locator;
  readonly DEwindZoneOption: Locator;
  readonly territoryField: Locator;
  readonly territorySearch: Locator;
  readonly territoryOption: Locator;

  // ES
  readonly ESmarketOption: Locator;
  readonly ESRegion: Locator;
  readonly ESCountry: Locator;
  readonly ESwindZoneOption: Locator;

  //IE
  readonly IEmarketOption: Locator;
  readonly countryComboBox: Locator;
  readonly countryComboxBoxChoice: Locator;
  readonly IEwindZoneOption: Locator;
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
    this.saveBtn_Details = page.locator('form').filter({ hasText: 'VF Customer Sharing MarketVF' }).locator('button[name="update"]');
    this.saveBtn_Address = page.locator('form').filter({ hasText: 'AddressAddressCountryCountry' }).locator('button[name="update"]');
    this.siteRecord = page.getByRole('link', { name: 'DE-TIMS-100104' });
    this.searchBoxforTIMSCode = page.locator(`[name='Site-search-input']`);
    this.TIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: '-TIMS-' });
    this.createnewAppButton = page.locator('records-highlights-details-item').filter({ hasText: 'Start New ApplicationCreate' }).getByRole('link');
    this.projectTab = page.getByRole('tab', { name: 'Projects' });
    //------------------------------------------------
    this.siteNameTxt = page.locator('[name="Site_Name__c"]');
    this.marketList = page.getByRole('combobox', { name: 'Market' });
    this.Country = page.getByRole('combobox', { name: 'Country' });
    this.smartSiteList = page.getByRole('combobox', { name: 'Smart Site' });
    this.YesSmartSiteOption = page.getByRole('option', { name: 'Yes' });
    this.lat = page.getByLabel('*Lat');
    this.long = page.getByLabel('*Long');
    this.Region = page.getByRole('combobox', { name: 'Region (TDb)' });
    this.saveBtn = page.locator('.slds-button.slds-button_brand');
    //DE
    this.DEmarketOption = page.getByRole('option', { name: 'DE', exact: true }).locator('span').nth(1);
    this.DEwindZoneOption = page.locator('span').filter({ hasText: '1' }).nth(1);
    this.territoryField = page.locator('lightning-output-field').filter({ hasText: 'Territory' }).locator('lightning-formatted-lookup');
    this.territorySearch = page.getByPlaceholder('Search Territories...');
    this.territoryOption = page.locator('span').filter({ hasText: 'New Test' }).nth(4);

    // ES 
    this.ESmarketOption = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESCountry = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESRegion = page.getByRole('option', { name: 'R1' }).locator('span').nth(1);
    this.ESwindZoneOption = page.getByTitle('A', { exact: true });


    //IE
    this.IEmarketOption = page.locator('xpath=//*[@title="IE"]');
    this.countryComboBox = page.locator('[name="Country__c"]');
    this.countryComboxBoxChoice = page.getByTitle("IE").locator('nth=1');
    this.IEwindZoneOption = page.getByTitle('1', { exact: true });
    this.countyTxtBox = page.locator('[name="sitetracker__County__c"]');
  }

  //Function to get the tims code
  @step("Store TIMS site Code")
  async getTIMSCode(): Promise<string> {
    const timsCode = await this.TIMSsiteCode.innerText();
    return timsCode;
  }

  @step("Create new site")
  async createNewSite():Promise<void> {
    await this.sitesTab.click();
    await this.newSiteButton.click();
  }
  
  @step("Open Site Page and Select Record")
  async openSite(timsSiteCode: string) {
    await this.searchBoxforTIMSCode.fill(timsSiteCode);
    await this.searchBoxforTIMSCode.press('Enter');
    await this.siteRecord.click();
  }

  @step("Create Smart DE site in TIMS")
  async createSmartDESite(siteName: string, DECompanyCode: string, lat: string, long: string) :Promise<void>{
    await this.siteNameTxt.fill(siteName);
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.action.enterDECompanyCode(DECompanyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }

  @step("Create Smart ES site in TIMS")
  async createSmartESSite(siteName: string, EScompanyCode: string, lat: string, long: string) :Promise<void>{
    await this.siteNameTxt.fill(siteName);
    await this.marketList.click();
    await this.ESmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.Country.click();
    await this.ESCountry.click();
    await this.Region.click();
    await this.ESRegion.click();
    await this.action.enterESCompanyCode(EScompanyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }

  @step("Create Smart IE site in TIMS")
  async createSmartIESite(siteName: string, IEcompanyCode: string, lat: string, long: string, county: string):Promise<void> {
    await this.siteNameTxt.fill(siteName);
    await this.marketList.click();
    await this.IEmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.action.enterIECompanyCode(IEcompanyCode)
    await this.countryComboBox.click();
    await this.page.keyboard.type('I');
    await this.page.keyboard.press('Enter');
    //await this.countryComboxBoxChoice.click();
    await this.countyTxtBox.fill(county);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.saveBtn.click();
  }
  @step("Create DE Normal Site")
  async createNormalSite(siteName: string, companyCode: string, lat: string, long: string) {
    await this.siteNameTxt.fill(siteName);
    await this.action.enterDECompanyCode(companyCode);
    await this.lat.fill(lat);
    await this.long.fill(long);
    await this.action.saveRecord();
}

  @step("Update Smart DE site in TIMS")
  async updateDESmartSite(territory: string) :Promise<void> {
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
    await this.territorySearch.fill(territory);
    await this.territorySearch.click();
    await expect(this.territoryOption).toBeVisible();
    await this.territoryOption.click();
    await this.saveBtn_Address.click();
    await this.page.waitForTimeout(6000);
  }

  @step("Update Smart ES site in TIMS")
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

  @step("Update Smart IE site in TIMS")
  async updateIESmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click({ timeout: 900 });
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.IEwindZoneOption.click();
    await this.saveBtn_Details.click();
    await expect(this.saveBtn_Details).not.toBeVisible();
  }
}