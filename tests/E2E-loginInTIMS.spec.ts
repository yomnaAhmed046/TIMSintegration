import {test, expect} from '@playwright/test'
import loginPage from '../pages/TIMS_loginPage';
import fs from 'fs';

test('The user should login successfully', async({page})=>{

    const userLoginData = JSON.parse(fs.readFileSync('E2E-testData/userLoginData.json', 'utf8'));

    const login = new loginPage(page)

    await login.navigateToURL(userLoginData.timsFullURL);
    await login.login(userLoginData.timsUsername,userLoginData.timsPassword);

})





