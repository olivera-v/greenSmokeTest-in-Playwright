import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MrezaPage } from "../pages/MrezaPage";
import { MrezaNSPage } from "../pages/MrezaNSPage";

test('opening Contact Page', async ({ page }) => {
    const homePage = new HomePage(page);
    const mrezaPage = new MrezaPage(page);

    await page.goto('https://greenbsn.com/sr/');
    await homePage.setLinkZaKontakt();
    const emailInput = mrezaPage.inputField;
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await expect(emailInput).toBeVisible();
})

test('Data displey NS', async ({ page }) => {
    const homePage = new HomePage(page);
    const mrezaNSPage = new MrezaNSPage(page);

    await page.goto('https://greenbsn.com/sr/');
    const linkZaKontakt = homePage.uzmiLinkZaKontakt;
    const DiskontNS = mrezaNSPage.diskontNS;
    await homePage.openDropdownAndSelectOption(linkZaKontakt, DiskontNS);
    const address = mrezaNSPage.addressLink;
    const landlinePhone = mrezaNSPage.landlinePhoneLink;
    const fb = mrezaNSPage.fbLink;
    await expect(address).toBeVisible();
    await expect(landlinePhone).toBeVisible();
    await expect(fb).toBeVisible();
})

test('checking The Functionality Of Links', async ({ page }) => {
    const homePage = new HomePage(page);
    const mrezaNSPage = new MrezaNSPage(page);
    
    await page.goto('https://greenbsn.com/sr/');
    const linkZaKontakt = homePage.uzmiLinkZaKontakt;
    const DiskontNS = mrezaNSPage.diskontNS;
    await linkZaKontakt.hover();
    await DiskontNS.click();
    const fbOk = await mrezaNSPage.verifyFacebookLink();
    expect(fbOk).toBeTruthy();
    const emailOk = await mrezaNSPage.verifyEmailLink();
    expect(emailOk).toBeTruthy();


})
