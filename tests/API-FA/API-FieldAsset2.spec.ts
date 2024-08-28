import { test, expect } from '@playwright/test'
import fs from 'fs';
import { PageManager } from '../../pages/PageManager';
import { runCreateSmartESSiteTest } from '../../tests/Integration-CommanderE2E/CreateSmartESSite.spec';
import DCmeter from '../../TestData/API-FA/DC_Meter.json'
import { generateToken } from '../../utils/FAToken';

let pm;

test.describe("ES smart site integration", () => {
    let token: string;
    test.beforeEach(async ({ page, request }) => {
        pm = new PageManager(page);
        token = await generateToken(request);
    });


test('TIMS full API token', async ({request})=>{

})

    test('create FA in ES site in TIMS', async ({ page, request }) => {
       
    //     const responseToken = await request.post('https://auth.api.vantagetowers.com/oauth2/token',{
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         form:{
    //             "grant_type":"client_credentials",
    //             "client_id":"3hdqjgfav9m603vv6noj1glo6p",
    //             "client_secret":"ault6up5o83covann88oo315roc9l2lmd8q9c7h8nogpehfulhe"
    //         }
    //     })
    
    //     const responseBody = await responseToken.json()
    //    const accessToken = responseBody.access_token
    //    console.log(accessToken)


        const ESTIMSsiteCode = await runCreateSmartESSiteTest({ page });
 // Load the payloads from the JSON file
 const payloads = JSON.parse(fs.readFileSync('TestData/API-FA/DC_Meter.json', 'utf8'));

 // Extract keys from other test cases (simulated here for the example)
 const keys = [ESTIMSsiteCode]
 

 for (const payload of payloads) { // Iterate over each payload in the JSON file
     for (const key of keys) {
         
             // Update the payload with the current values
             payload.key.string = `Overview\\Dublin\\${key}\\DC Meter`;

             console.log(payload); // Log the modified payload

             // Send the API request
             const response = await request.post('https://dev.sit.api.vantagetowers.com/resourceIoT/v1', {
                 headers: {
                     "x-api-key": "YFtTVsKBUU78M7LZiMkZR2Jpq95d3j9j6i0mcnId",
                     "Authorization": token
                 },
                 data: payload
             });

             console.log(`Adding Field asset to site: ${key} and device_type: ${payload.device_type.string}`);
             console.log('Response:', await response.json());
             // Add assertions 
         
     }
 }
});
 })
