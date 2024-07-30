import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export default class TIMSnewSitePage extends BasePage{
  readonly page: Page;
  readonly siteNameTxt: Locator;
  readonly marketList: Locator;
  readonly DEmarketOption: Locator;
  readonly IEmarketOption: Locator;
  readonly smartSiteList: Locator;
  readonly YesSmartSiteOption: Locator;
  readonly companyCodeTXT: Locator;
  readonly IEcompanyCodeOption: Locator;
  readonly DEcompanyCodeOption: Locator;
  readonly latitude: Locator;
  readonly longitude: Locator;
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
    super(page)
    this.siteNameTxt = page.locator('[name="Site_Name__c"]');
    this.marketList = page.getByRole('combobox', { name: 'Market' });
    this.DEmarketOption = page.getByRole('option', { name: 'DE', exact: true }).locator('span').nth(1);
    this.smartSiteList = page.getByRole('combobox', { name: 'Smart Site' });
    this.YesSmartSiteOption = page.getByRole('option', { name: 'Yes' });
    this.companyCodeTXT = page.getByPlaceholder('Search Company Code...');
    this.IEcompanyCodeOption = page.getByRole('option', { name: 'IE91 IE91' }).locator('span').nth(2);
    this.DEcompanyCodeOption = page.getByRole('option', { name: 'DE91 DE91' }).locator('span').nth(2);
    this.latitude = page.getByLabel('*Lat');
    this.longitude = page.getByLabel('*Long');
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

  async createSmartDESite() {
    await this.siteNameTxt.fill("xx");
    await this.marketList.click();
    await this.DEmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("DE91");
    await this.DEcompanyCodeOption.click();
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
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
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
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
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
    await this.saveBtn.click();

  }
}