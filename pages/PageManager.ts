import { Page, expect } from "@playwright/test";
//TIMS Imports
import TIMSloginPage from "../pages/TIMS_loginPage";
import TIMSApplicationPage from './TIMSApplicationPage.ts';
import TIMSSitePage from './TIMSSitePage.ts';
import TIMSProjectPage from '../pages/TIMSProjectPage.ts';
import TIMSRequestPage from '../pages/TIMSRequestPage.ts';
import TIMSLeasePage from '../pages/TIMSLeasePage.ts';
import TIMSCandidatePage  from "../pages/TIMSCandidatePage.ts";
import TIMSSiteContactsPage from "./TIMSSiteContactsPage.ts";
import TIMSAccessPage from "./TIMSAccessPage.ts";
import TIMSJobsPage from "./TIMSJobsPage.ts";

//Integration Imports
import CommanderLoginPage from '../pages/Commander-loginPage';
import CommanderQuickAccessPage from '../pages/Commander_QuickAccessPage';
import CommanderHomePage from '../pages/Commander_homePage';
import CommanderEntityMNGPage from '../pages/Commander-entityMNGpage';

import V5LandingPage from '../pages/V5-landingPage.ts'
import V5SiteInfoPage from "./V5-SiteInfoPage.ts";


export class PageManager {

    private readonly page: Page;
    private readonly loginObj: TIMSloginPage;
    //private readonly actionobj: Actions;
    private readonly siteObj: TIMSSitePage;
    private readonly appObj: TIMSApplicationPage;
    private readonly projectObj: TIMSProjectPage;
    private readonly requestObj: TIMSRequestPage;
    private readonly leaseObj: TIMSLeasePage;
    private readonly cadidateObj: TIMSCandidatePage;
    private readonly siteContactObj: TIMSSiteContactsPage;
    private readonly accessObj: TIMSAccessPage;
    private readonly jobObj: TIMSJobsPage;

    private readonly commanderLoginObj: CommanderLoginPage;
    private readonly commaderQuickAccObj: CommanderQuickAccessPage;
    private readonly commanderHomeObj: CommanderHomePage;
    private readonly commanderEntityObj: CommanderEntityMNGPage;

    private readonly v5LandingObj: V5LandingPage;
    private readonly v5siteInfoObj: V5SiteInfoPage;



    constructor(page: Page) {
        this.page = page;
        this.loginObj = new TIMSloginPage(this.page);
        //this.actionobj = new Actions(this.page);
        this.siteObj = new TIMSSitePage(this.page);
        this.appObj = new TIMSApplicationPage(this.page);
        this.projectObj = new TIMSProjectPage(this.page);
        this.requestObj = new TIMSRequestPage(this.page);
        this.leaseObj = new TIMSLeasePage(this.page);
        this.cadidateObj = new TIMSCandidatePage(this.page);
        this.siteContactObj = new TIMSSiteContactsPage(this.page);
        this.accessObj = new TIMSAccessPage(this.page);
        this.jobObj = new TIMSJobsPage(this.page);

        this.commanderLoginObj = new CommanderLoginPage(this.page);
        this.commaderQuickAccObj = new CommanderQuickAccessPage(this.page);
        this.commanderHomeObj = new CommanderHomePage(this.page);
        this.commanderEntityObj = new CommanderEntityMNGPage(this.page);
        this.v5LandingObj = new V5LandingPage(this.page);
        this.v5siteInfoObj = new V5SiteInfoPage(this.page);

    }

    // actionsTIMS(){
    //     return this.actionobj;
    // }

    appTIMS() {
        return this.appObj;
    }

    loginTIMS() {
        return this.loginObj;
    }

    siteTIMS() {
        return this.siteObj;
    }

    projectTIMS() {
        return this.projectObj;
    }

    requestTIMS() {
        return this.requestObj;
    }

    leaseTIMS() {
        return this.leaseObj;
    }

    candidateTIMS() {
        return this.cadidateObj;
    }

    siteContactTIMS() {
        return this.siteContactObj;
    }

    accessTIMS() {
        return this.accessObj;
    }

    jobsTIMS() {
        return this.jobObj;
    }

    loginCommander() {
        return this.commanderLoginObj;
    }

    quickAccessCommander() {
        return this.commaderQuickAccObj;
    }

    homePageCommander() {
        return this.commanderHomeObj;
    }

    entityMNGCommander() {
        return this.commanderEntityObj;
    }

    v5LandingPage(){
        return this.v5LandingObj;
    }

    v5SiteInfoPage(){
        return this.v5siteInfoObj;
    }
}