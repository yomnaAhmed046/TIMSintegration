import { Page, expect } from "@playwright/test";
//TIMS Imports
import TIMSloginPage from "../pages/TIMS_loginPage";
import TIMSApplicationPage from './TIMSApplicationPage.ts';
import TIMSSitePage from './TIMSSitePage.ts';
import TIMSProjectPage from '../pages/TIMSProjectPage.ts'
//Integration Imports
import CommanderLoginPage from '../pages/Commander-loginPage';
import CommanderQuickAccessPage from '../pages/Commander_QuickAccessPage';
import CommanderHomePage from '../pages/Commander_homePage';
import CommanderEntityMNGPage from '../pages/Commander-entityMNGpage';


let TIMSsiteCodeText: string | null ;

export class PageManager{

    private readonly page: Page;
    private readonly loginObj: TIMSloginPage;
    //private readonly actionobj: Actions;
    private readonly siteObj: TIMSSitePage;
    private readonly appObj: TIMSApplicationPage;
    private readonly projectObj: TIMSProjectPage;

    private readonly commanderLoginObj: CommanderLoginPage;
    private readonly commaderQuickAccObj: CommanderQuickAccessPage;
    private readonly commanderHomeObj: CommanderHomePage;
    private readonly commanderEntityObj: CommanderEntityMNGPage;

    constructor(page: Page){
        this.page = page;
        this.loginObj = new TIMSloginPage(this.page);
        //this.actionobj = new Actions(this.page);
        this.siteObj = new TIMSSitePage(this.page);
        this.appObj = new TIMSApplicationPage(this.page);
        this.projectObj = new TIMSProjectPage(this.page);

        this.commanderLoginObj = new CommanderLoginPage(this.page);
        this.commaderQuickAccObj = new CommanderQuickAccessPage(this.page);
        this.commanderHomeObj = new CommanderHomePage(this.page);
        this.commanderEntityObj = new CommanderEntityMNGPage(this.page);

    }

    // actionsTIMS(){
    //     return this.actionobj;
    // }

    appTIMS(){
        return this.appObj;
    }

    loginTIMS(){
        return this.loginObj;
    }

    siteTIMS(){
        return this.siteObj;
    }

    projectTIMS(){
        return this.projectObj;
        }

    loginCommander(){
        return this.commanderLoginObj;
    }
    
    quickAccessCommander(){
        return this.commaderQuickAccObj;
    }

    homePageCommander(){
        return this.commanderHomeObj;
    }

    entityMNGCommander(){
        return this.commanderEntityObj;
    }
}