import { request, APIRequestContext } from '@playwright/test';

export async function generateToken(request: APIRequestContext): Promise<string> {
    const response = await request.post('https://auth.api.vantagetowers.com/oauth2/token', {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            "grant_type": "client_credentials",
            "client_id": "3hdqjgfav9m603vv6noj1glo6p",
            "client_secret": "ault6up5o83covann88oo315roc9l2lmd8q9c7h8nogpehfulhe"
        }
    });

    const { access_token } = await response.json();
    return access_token;
}
