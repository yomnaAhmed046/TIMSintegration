import { Page, Locator } from 'playwright';


export default class CommanderLoginPage {
    readonly page: Page;
    readonly commanderUernameTxt: Locator;
    readonly commanderPasswordTxt: Locator;
    readonly commanderLoginBtn: Locator;
    readonly showPass: Locator;


    constructor(page: Page) {
        this.page = page;
        this.commanderUernameTxt = page.locator("#Username");
        this.commanderPasswordTxt = page.locator("#Password");
        this.commanderLoginBtn = page.locator("#btnSubmitLoginForm");
        this.showPass = page.locator(".fa-eye-slash");
    }

    async navigateToURL(commanderURL) {
        await this.page.goto(commanderURL)
    }

    async getTitle() {
        return await this.page.title();
    }

    async login(commanderUernameTxt, commanderPasswordTxt) {
        await this.commanderUernameTxt.fill(commanderUernameTxt);
        await this.commanderPasswordTxt.fill(commanderPasswordTxt);
        await this.showPass.click()
        await this.commanderLoginBtn.click();
    }

}