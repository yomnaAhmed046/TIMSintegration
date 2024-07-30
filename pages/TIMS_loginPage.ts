import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';


export default class TIMSloginPage extends BasePage{
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;
    readonly closeBtn: Locator;


    constructor(page: Page) {
        super(page)
        this.usernameTxt = page.locator("#username").filter();
        this.passwordTxt = page.locator("#password");
        this.loginBtn = page.locator("#Login");
        this.closeBtn = page.locator('[name="j_id0:j_id50:j_id51"]');
    }

    async navigateToURL(timsFullURL) {
        await this.openUrl(timsFullURL);
    }

    async getTitle() {
        return await this.page.title();
    }

    async login(timsUsername, timsPassword) {
        await this.usernameTxt.fill(timsUsername);
        await this.passwordTxt.fill(timsPassword);
        await this.loginBtn.click();
        await this.closeBtn.click();        
    }

}