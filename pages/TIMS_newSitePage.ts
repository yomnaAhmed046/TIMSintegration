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
  readonly Region:Locator;
  readonly Country:Locator;

   // ES
   readonly ESmarketOption: Locator;
   readonly EScompanyCodeOption: Locator;
   readonly ESRegion:Locator;
   readonly ESCountry:Locator;


  //IE
  readonly countryComboBox : Locator;
  readonly countryComboxBoxChoice: Locator;
  readonly countyTxtBox: Locator;
  readonly IEmarketOption: Locator;
  readonly IEcompanyCodeOption: Locator;


  //RO
  readonly ROcompanyCodeOption: Locator;
  readonly ROcompanyCodeSearch: Locator;
  readonly ROmarketOption: Locator;
  readonly ROregionOption: Locator;
  readonly ROCountryOption: Locator;


  //HU
  readonly HUmarketOption: Locator;
  readonly HUcompanyCodeOption: Locator;
  readonly marketDropdown: Locator;
  readonly HUregionOption: Locator;
  readonly HUCountryOption: Locator;
  

  //PT
  readonly PTmarketOption: Locator;
  readonly PTcompanyCodeOption: Locator;
  readonly PTregionOption: Locator;
  readonly PTCountryOption: Locator;

  
 

  constructor(page: Page) {
    this.page = page;
    this.siteNameTxt = page.locator('[name="Site_Name__c"]');
    this.marketList = page.getByRole('combobox', { name: 'Market' });
    this.DEmarketOption = page.getByRole('option', { name: 'DE', exact: true }).locator('span').nth(1);
    
    this.smartSiteList = page.getByRole('combobox', { name: 'Smart Site' });
    this.YesSmartSiteOption = page.getByRole('option', { name: 'Yes' });
    this.companyCodeTXT = page.getByPlaceholder('Search Company Code...');
    this.DEcompanyCodeOption = page.getByRole('option', { name: 'DE91 DE91' }).locator('span').nth(2);
    this.latitude = page.getByLabel('*Lat');
    this.longitude = page.getByLabel('*Long');
    this.Region = page.getByRole('combobox', { name: 'Region (TDb)' });
    this.saveBtn = page.locator('.slds-button.slds-button_brand');
    // ES 
    this.ESmarketOption = page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.EScompanyCodeOption = page.getByRole('option', { name: 'ES91 ES91' }).locator('span').nth(2);
    this.Country = page.getByRole('combobox', { name: 'Country' });
    this.ESCountry=page.getByRole('option', { name: 'ES', exact: true }).locator('span').nth(1);
    this.ESRegion=page.getByRole('option', { name: 'R1' }).locator('span').nth(1);
    
    //IE
    this.IEmarketOption = page.locator('xpath=//*[@title="IE"]');
    this.IEcompanyCodeOption = page.getByRole('option', { name: 'IE91 IE91' }).locator('span').nth(2);
    this.countryComboBox= page.locator('[name="Country__c"]');
    this.countryComboxBoxChoice= page.getByTitle("IE").locator('nth=1');
    this.countyTxtBox= page.locator('[name="sitetracker__County__c"]');

    //RO
    this.ROcompanyCodeOption = page.getByRole('option', { name: 'RO91 RO91' }).locator('span').nth(2);
    this.ROcompanyCodeSearch= page.locator("xpath=//*[@icon-name='utility:search'][3]");
    this.ROmarketOption = page.locator('xpath=//*[@title="RO"]');
    this.ROregionOption=page.locator('xpath=//*[@data-value="BA"]');
    this.ROCountryOption= page.locator('xpath=//span[@title="RO"]')



    //HU
    this.marketDropdown= page.locator('xpath=//*[@name="Market__c"]');
    this.HUmarketOption = page.getByRole('option', { name: 'HU', exact: true }).locator('span').nth(1);
    this.HUcompanyCodeOption = page.getByRole('option', { name: 'HU91 HU91' }).locator('span').nth(2);
    this.HUregionOption= page.locator('xpath=//span[@title="Pest"]');
    this.HUCountryOption= page.locator('xpath=//span[@title="HU"]')

    //PT
    this.PTmarketOption = page.getByRole('option', { name: 'PT', exact: true }).locator('span').nth(1);
    this.PTcompanyCodeOption = page.getByRole('option', { name: 'PT91 PT91' }).locator('span').nth(2);
    this.PTregionOption=page.locator('xpath=//*[@data-value="NORTE"]');
    this.PTCountryOption= page.locator('xpath=//span[@title="PT"]')




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
    await this.countyTxtBox.fill("county test");
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
    await this.saveBtn.click();
  }
  async createSmartROSite() {
    await this.siteNameTxt.fill("RO Site");
    await this.marketList.click();
    await this.ROmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("RO91");
    await this.companyCodeTXT.click();
    await this.ROcompanyCodeOption.click();
    await this.countryComboBox.click();
    //await this.ROCountryOption.click();
    await this.page.keyboard.type('R');
    await this.page.keyboard.press('Enter');
    await this.countyTxtBox.fill("county test");
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
    await this.Region.click();
    await this.ROregionOption.click();
    await this.saveBtn.click();
  }

  async createSmartHUSite() {
    await this.siteNameTxt.fill("HU Site");
    await this.marketList.click();
    await this.marketDropdown.click();
    await this.page.keyboard.press('Enter');
    await this.HUmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("HU91");
    await this.companyCodeTXT.click();
    await this.HUcompanyCodeOption.click();
    await this.countryComboBox.click();
    await this.page.keyboard.type('H');
    await this.page.keyboard.press('Enter');
    await this.countyTxtBox.fill("county test");
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
    await this.Region.click();
    await this.HUregionOption.click();
    await this.saveBtn.click();
  }

  async createSmartPTSite() {
    await this.siteNameTxt.fill("PT Site");
    await this.marketList.click();
    await this.marketDropdown.click();
    await this.page.keyboard.press('Enter');
    await this.PTmarketOption.click();
    await this.smartSiteList.click();
    await this.YesSmartSiteOption.click();
    await this.companyCodeTXT.click();
    await this.companyCodeTXT.fill("PT91");
    await this.companyCodeTXT.click();
    await this.PTcompanyCodeOption.click();
    await this.countryComboBox.click();
  //  await this.PTCountryOption.click();
    await this.page.keyboard.type('P');
    await this.page.keyboard.press('Enter');
    await this.countyTxtBox.fill("county test");
    await this.latitude.fill("1.1");
    await this.longitude.fill("2.2");
    await this.Region.click();
    await this.PTregionOption.click();


    await this.saveBtn.click();
  }

}