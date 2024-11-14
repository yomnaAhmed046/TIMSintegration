import { Page, Locator } from 'playwright';
import Actions from '../utils/Actions';
import { step } from '../utils/StepDecorator';

let equipmentOption;

export default class TIMSStructureEquipment {
    readonly page: Page;
    readonly actionObj: Actions;
    readonly searchItem: Locator;
    readonly itemOption: Locator;
    readonly equipmentSelection: Locator;



    constructor(page: Page) {
        this.actionObj = new Actions(page);
        this.searchItem = page.getByPlaceholder('Search Items...');
        this.itemOption = page.getByTitle('Auto-item - DE', { exact: true });
        //this.equipmentSelection = page.locator('label').filter({ hasText: equipmentOption}).locator('span').first();

    }

    // @step("Select the Structure Equipment Type")
    // async selectLeaseType(leaseType: string) {
    //     switch (leaseType) {
    //         case "leaseIn":
    //             break;

    //         case "leaseOutAnchorTenant":
    //             break;

    //         case "leaseOut3rdPartyTenant":
    //             break;

    //         case "GLBO":
    //             break;

    //         default:
    //             console.log("Unknown Lease Selection.");
    //     }
    // }


    // @step("User the Structure Equipment Type")
    // async selectEquipmentType(equipmentType: string): Promise<void> {
    //     equipmentSelection = page.locator('label').filter({ hasText: equipmentType }).locator('span').first();

    // }

    @step("User Create new Structure Equipmet")
    async createStructureEquipment(): Promise<void> {
        await this.actionObj.gotoNext();
        await this.searchItem.click({ timeout: 15000 });
        await this.searchItem.fill('auto', { timeout: 15000 });
        await this.itemOption.click({ timeout: 15000 });
        await this.actionObj.saveRecord();
        //await expect(page.locator('forcegenerated-highlightspanel_structure_equipment__c___0123x0000007zsaqaq___compact___view___recordlayout2 lightning-formatted-text').filter({ hasText: 'E-' })).toBeVisible();
        // await expect(page.locator('#tab-26 lightning-formatted-text').filter({ hasText: 'Proposed' })).toBeVisible();
    }



}