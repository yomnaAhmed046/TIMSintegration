import { Page, Locator } from 'playwright';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

export default class Actions {
    readonly page: Page;
    readonly newButton: Locator;
    readonly saveButton: Locator;
    readonly nextButton: Locator;
    readonly moreTabs: Locator;
    readonly files: Locator;
    readonly upload: Locator;
    readonly uploadFiles: Locator;
    readonly done: Locator;
    readonly done2: Locator;
    readonly appLuncher: Locator;
    readonly appsSearchbox: Locator;
    readonly objectValue: Locator;
    readonly searchSite: Locator;
    readonly siteValue: Locator;
    readonly customerAccount: Locator;
    readonly customerValue: Locator;
    readonly scopeOfWork: Locator;
    readonly siteConfigRequired: Locator;
    readonly siteConfigRequiredValue: Locator;
    readonly companyCodeTXT: Locator;
    readonly DECompanyCodeOption: Locator;
    readonly EScompanyCodeOption: Locator
    readonly IEcompanyCodeOption: Locator;
    readonly TIMSCode: Locator;

    constructor(page: Page) {
        this.page = page;
        this.TIMSCode = page.locator('lightning-formatted-text');
        this.newButton = page.getByRole('button', { name: 'New' });
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        //this.moreTabs = page.locator('ul').filter({ hasText: 'DetailsProjectsRental' }).getByRole('button');
        //this.moreTabs = page.getByText('MoreTabs');
        this.moreTabs = page.locator('forcegenerated-flexipageregion_application_record_page_main_application__c__view_js').getByText('MoreTabs');
        this.files = page.getByRole('menuitem', { name: 'Files' });
        this.upload = page.getByTitle('Upload');
        this.uploadFiles = page.getByText('Upload Files', { exact: true });
        this.done = page.getByText('Done');
        this.done2 = page.getByRole('button', { name: 'Done' });
        this.appLuncher = page.getByTitle('App Launcher');
        this.appsSearchbox = page.getByPlaceholder('Search apps and items...');
        this.searchSite = page.getByPlaceholder('Search Sites...');
        this.customerAccount = page.getByLabel('*Customer Account');
        //this.customerValue = page.getByRole('option', { name: 'Vodafone - DE', exact: true });
        //this.customerValue = page.getByText('Vodafone - DE', { exact: true });
        //this.customerValue = page.getByRole('option', { name: 'Vodafone - DE' });
        this.customerValue= page.getByRole('option', { name: 'Vodafone - DE 67677674' });
        this.scopeOfWork = page.getByLabel('*Scope of Work');
        this.siteConfigRequired = page.getByRole('combobox', { name: 'Site Config Required (' })
        this.siteConfigRequiredValue = page.getByText('Standard', { exact: true });
        this.companyCodeTXT = page.getByPlaceholder('Search Company Code...');
        this.DECompanyCodeOption = page.getByRole('option', { name: 'DE91 DE91' }).locator('span').nth(2);
        this.EScompanyCodeOption = page.getByRole('option', { name: 'ES91 ES91' }).locator('span').nth(2);
        this.IEcompanyCodeOption = page.getByRole('option', { name: 'IE91 IE91' }).locator('span').nth(2);
    }


    async getText(locator: Locator, text: string) {
        return await this.page.innerText(text);
    }

    async createNewObject() {
        await this.newButton.click();
    }

    async enterDECompanyCode(DEcompanyCode: string) {
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(DEcompanyCode);
        await this.DECompanyCodeOption.click();
    }

    async enterESCompanyCode(EScompanyCode: string) {
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(EScompanyCode);
        await this.EScompanyCodeOption.click();
    }

    async enterIECompanyCode(IEcompanyCode: string) {
        await this.companyCodeTXT.click();
        await this.companyCodeTXT.fill(IEcompanyCode);
        await this.IEcompanyCodeOption.click();
    }

    async clickOnElement(element: Locator) {
        await element.click();
    }

    async saveRecord() {
        await this.saveButton.click();
    }

    async gotoNext() {
        await this.nextButton.click();
    }

    async searchOpenObject(objectName: string) {
        await this.appLuncher.click();
        await this.appsSearchbox.fill(objectName);
        await this.page.pause();
        await this.page.getByRole('option', { name: `${objectName}`, exact: true }).click();
    }

    async enterTIMSSiteCode(timsSiteCode: string) {
        await this.searchSite.fill(timsSiteCode);
        await this.searchSite.click();
        await this.page.getByRole('option', { name: `${timsSiteCode}`, exact: true }).click();
    }

    async enterScopeOfWork(scopeText: string) {
        await this.scopeOfWork.fill(scopeText);
    }

    async enterCustomerAccount(customerAccount: string) {
        await this.customerAccount.fill(customerAccount);
        await this.customerAccount.click();
        await this.customerValue.click();
    }

    async enterSiteConfig() {
        await this.siteConfigRequired.click();
        await this.siteConfigRequiredValue.click();
    }

    async opemMoreTabs() {
        await this.moreTabs.click();
    }
    
    async uploadFile() {
        await this.moreTabs.click();
        await this.files.click();
        await this.upload.click();
        //await this.uploadFiles.click();
        let [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.uploadFiles.click(),
        ]);
        await fileChooser.setFiles("./TestData/testUpload.png");
        //await expect(this.page.getByText('1 of 1 file uploaded')).toBeVisible();
        await this.done.click();
        //await expect(this.page.getByLabel('Pending')).toBeVisible();
        await this.done2.click();
    }

    async addRecordtoExcel(recordID: string, index: number) {
        const results: any[] = [];
        try {
            const resultObj = {result: recordID};
            results.push(resultObj);
        } catch (error) {
            results.push({ testName: 'example test', result: 'Failed', error: error.message });
        }
        await this.testWritetoExcel(results,'C:/Users/AbdoN2/Downloads/Playwright Repo/TIMSintegration/createdRecords.xlsx', index);
    }

    async prepareFileData(sheetname: string, title: string, value: string) {
        const worksheetData = [
            [title], 
            [value], 
        ];
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
        XLSX.writeFile(workbook, 'createdRecords.xlsx');
    }

    async getCodeValue() {
        await this.page.waitForSelector('lightning-formatted-text[slot="primaryField"][lwc-f6gbo863ml-host]');
        const recordIDSelector = await this.page.$('lightning-formatted-text[slot="primaryField"][lwc-f6gbo863ml-host]');    
        const recordID = await recordIDSelector?.innerText();
        return recordID;
    }

    async pushValues(value: string) {
        const results: any[] = [];
        try {
            const resultObj = { result: value };
            results.push(resultObj);
        } catch (error) {
            results.push({ testName: 'example test', result: 'Failed', error: error.message });
        }
        return results;
    }

    async testWritetoExcel(results: any[], filePath: string, index: number) {
        try {
            if (!Array.isArray(results)) {
                throw new TypeError('The provided results are not an array');
            }
            const fileExists = fs.existsSync(filePath);
            let workbook: XLSX.WorkBook;
            let worksheet: XLSX.WorkSheet;
            if (fileExists) {
                workbook = XLSX.readFile(filePath);
                worksheet = workbook.Sheets[workbook.SheetNames[index]];
            } else {
                workbook = XLSX.utils.book_new();
                worksheet = XLSX.utils.aoa_to_sheet([['Test Name', 'Result', 'Error']]);
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
            }
            const newData = results.map(result => [result.result]);
            XLSX.utils.sheet_add_aoa(worksheet, newData, { origin: -1 });
            XLSX.writeFile(workbook, filePath);
            console.log("Data written to Excel successfully");
        } catch (error) {
            console.error("Error writing to Excel:", error.message);
        }
    }
}
