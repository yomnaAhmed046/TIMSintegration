import { expect } from '@playwright/test';
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
  readonly DETIMSsiteCode: Locator;
  readonly ESTIMSsiteCode: Locator;
  readonly IETIMSsiteCode: Locator;
  readonly ROTIMSsiteCode: Locator;
  readonly HUTIMSsiteCode: Locator;
  readonly PTTIMSsiteCode: Locator;
  readonly ESwindZoneOption:Locator;
  readonly windValidation: Locator;
  readonly HUwindZoneOption: Locator;
  readonly PTwindZoneOption: Locator;
  readonly ROwindZoneOption: Locator;


    //update site assertions
    readonly siteStatusTxt: Locator;
    readonly criticalSiteTxt: Locator;
    readonly windZoneTxt: Locator;
    readonly countryTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.siteStatusEditBtn = page.locator('lightning-output-field').filter({ hasText: 'Site StatusSite Status Help' }).locator('lightning-formatted-text');
    //this.siteStatusList = page.getByLabel('Site Status - Current');
    this.siteStatusList= page.locator('xpath=//button[@name="sitetracker__Site_Status__c"]');
   // this.siteStatusOption = page.locator('span').filter({ hasText: 'Pipeline' }).first();
   this.siteStatusOption= page.locator('xpath=//*[@data-value="Pipeline"]');
   
   this.criticalSiteList = page.locator('[name="Critical_Site__c"]');
    this.criticalSiteYes = page.locator('span').filter({ hasText: 'Yes' }).first();
   
    //this.windZoneList = page.getByLabel('Wind Zone - Current Selection: --None--', { exact: true });
   this.windZoneList=page.locator('[name="Wind_Zone__c"]')
    this.DEwindZoneOption = page.locator('span').filter({ hasText: '1' }).first();
    
    //this.saveBtn_Details = page.locator('form').filter({ hasText: 'VF Customer Sharing' }).locator('button[name="update"]');
    this.saveBtn_Details=page.locator('xpath=//record_flexipage-desktop-record-page-decorator/div[1]/records-record-layout-event-broker/slot/slot/flexipage-record-home-template-desktop2/div/div[2]/div[1]/slot/flexipage-component2/slot/flexipage-tabset2/div/lightning-tabset/div/slot/slot/flexipage-tab2[1]/slot/flexipage-component2[1]/slot/flexipage-aura-wrapper/div/div/form/div/div/div[2]/span[2]/button')
   
    this.territoryField = page.locator('lightning-output-field').filter({ hasText: 'Territory' }).locator('lightning-formatted-lookup');
    this.territorySearch = page.getByPlaceholder('Search Territories...');
    this.territoryOption = page.locator('span').filter({hasText: 'New Test'}).nth(4);
   
    this.saveBtn_Address = page.locator('form').filter({ hasText: 'AddressAddressCountryCountry' }).locator('button[name="update"]');
  
    this.IETIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'IE-TIMS-' });
    this.DETIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'DE-TIMS-' });
    this.ESTIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'ES-TIMS-' });
    this.ROTIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'RO-TIMS-' });
    this.HUTIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'HU-TIMS-' });
    this.PTTIMSsiteCode = page.locator('lightning-formatted-text').filter({ hasText: 'PT-TIMS-' });

    //HU
    this.HUwindZoneOption = page.locator('span').filter({ hasText: '0' }).first();

    //PT
    this.PTwindZoneOption = page.locator('xpath=//span[@title="0"]');

    //RO
    this.ROwindZoneOption = page.locator('xpath=//span[@title="0"]');



  //Update Site Assertions
  this.siteStatusTxt= page.locator('xpath=//*[@aria-label="Site Status"]/span/text()');
  this.criticalSiteTxt= page.locator('xpath=//*[@aria-label="Critical Site (TDb)"]/span/text()');
 this. windZoneTxt= page.locator('xpath=//*[@aria-label="Wind Zone"]/span/text()');
 this.countryTxt= page.locator('xpath=//*[@aria-label="Country"]/span/text()');

}

  async updateDESmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    // await expect(!this.windValidation.isVisible)
    
    
    await this.DEwindZoneOption.click();
    await this.saveBtn_Details.click();
    await this.territoryField.dblclick();
    await this.territorySearch.fill("New Test");
    await this.territorySearch.click();
    await this.territoryOption.click();
    await this.saveBtn_Address.click();
  }

  async updateIESmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.DEwindZoneOption.click();
    await this.saveBtn_Details.click();
  
  }
  async updateROSmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.ROwindZoneOption.click();
    console.log(this.siteStatusTxt);
    console.log(this.criticalSiteTxt);
    console.log(this.windZoneTxt);
    await expect(this.siteStatusTxt.getByText("Pipeline")).toBeVisible;
    await expect(this.criticalSiteTxt.getByText("Yes")).toBeVisible;
    await expect (this.windZoneTxt.getByText("0")).toBeVisible;
    await expect (this.countryTxt.getByText("RO")).toBeVisible;


    await this.saveBtn_Details.click();
    console.log("save btn selected");
  
  }
  async updateHUSmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
    await this.HUwindZoneOption.click();
    console.log(this.siteStatusTxt);
    console.log(this.criticalSiteTxt);
    console.log(this.windZoneTxt);
    await expect(this.siteStatusTxt.getByText("Pipeline")).toBeVisible;
    await expect(this.criticalSiteTxt.getByText("Yes")).toBeVisible;
    await expect (this.windZoneTxt.getByText("N/A")).toBeVisible;
    await expect(this.countryTxt.getByText("HU")).toBeVisible;
    await this.saveBtn_Details.click();
    console.log("save btn selected");

  }

  async updatePTSmartSite() {
    await this.siteStatusEditBtn.dblclick();
    await this.siteStatusList.click();
    await this.siteStatusOption.click();
    await this.criticalSiteList.click();
    await this.criticalSiteYes.click();
    await this.windZoneList.click();
   await this.PTwindZoneOption.click();
   console.log(this.siteStatusTxt);
    console.log(this.criticalSiteTxt);
    console.log(this.windZoneTxt);
   await expect(this.siteStatusTxt.getByText("Pipeline")).toBeVisible;
    await expect(this.criticalSiteTxt.getByText("Yes")).toBeVisible;
    await expect (this.windZoneTxt.getByText("0")).toBeVisible;
    await expect (this.countryTxt.getByText("PT")).toBeVisible; 
    await this.saveBtn_Details.click();  
    console.log("save btn selected");
  }


}