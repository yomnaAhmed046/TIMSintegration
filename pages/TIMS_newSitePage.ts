import { Page, Locator } from 'playwright';


export default class TIMSnewSitePage {
  readonly page: Page;
  readonly siteNameTxt: Locator;
  readonly marketList: Locator;
  readonly DEmarketOption: Locator;
  readonly smartSiteList: Locator;
  readonly YesSmartSiteOption: Locator;
  readonly companyCodeTXT: Locator;
  readonly DEcompanyCodeOption: Locator;
  readonly latitude: Locator;
  readonly longitude: Locator;
  readonly saveBtn: Locator;
  // ES
  readonly ESmarketOption: Locator;
  readonly EScompanyCodeOption: Locator;
  readonly Region:Locator;
  readonly ESRegion:Locator;
  readonly Country:Locator;
  readonly ESCountry:Locator;



  constructor(page: Page) {
    this.page = page;
    this.siteNameTxt = page.locator('[name="Site_Name__c"]');
    this.marketList = page.getByLabel('Market - Current Selection: DE');
    this.DEmarketOption = page.getByRole('option', { name: 'DE', exact: true }).locator('span').nth(1);
    this.smartSiteList = page.getByLabel('Smart Site - Current');
    this.YesSmartSiteOption = page.getByRole('option', { name: 'Yes' });
    this.companyCodeTXT = page.getByPlaceholder('Search Company Code...');
    this.DEcompanyCodeOption = page.getByRole('option', { name: 'DE91 DE91' }).locator('span').nth(2);
    this.latitude = page.getByLabel('*Lat');
    this.longitude = page.getByLabel('*Long');
    this.Region=page.getByLabel('Region (TDb) - Current Selection: --None--')
    this.Country=page.locator('label:has-text("Country")')
    this.saveBtn = page.locator('.slds-button.slds-button_brand');
    // ES 
    this.ESmarketOption = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.EScompanyCodeOption = page.getByRole('option', { name: 'ES91 ES91' }).locator('span').nth(2);
    this.ESCountry=page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESRegion=page.getByRole('option', { name: 'B', exact: true }).locator('span').nth(1);
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

  

  
}