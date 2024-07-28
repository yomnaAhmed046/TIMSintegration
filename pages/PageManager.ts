import { Page, expect } from "@playwright/test";

import TIMSloginPage from "../pages/TIMS_loginPage";
import TIMShomePage from '../pages/TIMS_homePage';
import newSitePage from '../pages/TIMS_newSitePage';
import TIMSsiteInfoPage from '../pages/TIMS_siteInfoPage';
import CommanderLoginPage from '../pages/Commander-loginPage';
import CommanderQuickAccessPage from '../pages/Commander_QuickAccessPage';
import CommanderHomePage from '../pages/Commander_homePage';
import CommanderEntityMNGPage from '../pages/Commander-entityMNGpage';

let TIMSsiteCodeText: string | null ;

export class PageManager{

    private readonly page: Page;
    private readonly loginObj: TIMSloginPage;
    private readonly homeObj: TIMShomePage;
    private readonly siteObj: newSitePage;
    private readonly siteInfoObj: TIMSsiteInfoPage;

    private readonly commanderLoginObj: CommanderLoginPage;
    private readonly commaderQuickAccObj: CommanderQuickAccessPage;
    private readonly commanderHomeObj: CommanderHomePage;
    private readonly commanderEntityObj: CommanderEntityMNGPage;

    constructor(page: Page){
        this.page = page;
        this.loginObj = new TIMSloginPage(this.page);
        this.homeObj = new TIMShomePage(this.page);
        this.siteObj = new newSitePage(this.page);
        this.siteInfoObj = new TIMSsiteInfoPage(this.page);

        this.commanderLoginObj = new CommanderLoginPage(this.page);
        this.commaderQuickAccObj = new CommanderQuickAccessPage(this.page);
        this.commanderHomeObj = new CommanderHomePage(this.page);
        this.commanderEntityObj = new CommanderEntityMNGPage(this.page , TIMSsiteCodeText);

    }

    loginTIMS(){
        return this.loginObj
    }
    homePageTIMS(){
        return this.homeObj
    }
    newsiteTIMS(){
        return this.siteObj
    }
    siteInfoTIMS(){
        return this.siteInfoObj
    }
    loginCommander(){
        return this.commanderLoginObj
    }
    quickAccessCommander(){
        return this.commaderQuickAccObj
    }
    homePageCommander(){
        return this.commanderHomeObj
    }
    entityMNGCommander(){
        return this.commanderEntityObj
    }
}