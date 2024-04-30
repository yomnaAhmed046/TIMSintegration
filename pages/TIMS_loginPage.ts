import { Page, Locator } from 'playwright';


export default class TIMSloginPage {
    readonly page: Page;
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;
    readonly closeBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameTxt = page.locator("#username").filter();
        this.passwordTxt = page.locator("#password");
        this.loginBtn = page.locator("#Login");
        this.closeBtn = page.locator('[name="j_id0:j_id62:j_id63"]');

    }

    async navigateToURL(timsFullURL) {
        await this.page.goto(timsFullURL)
    }

    async getTitle() {
        return await this.page.title();
    }

    async login(timsUsername, timsPassword) {
        await this.usernameTxt.fill(timsUsername);
        await this.passwordTxt.fill(timsPassword);
        await this.loginBtn.click();
        await this.closeBtn.click()

        
    }

}