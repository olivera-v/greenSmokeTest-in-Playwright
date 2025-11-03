import test, { expect, Locator } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { MojGreenKutakPage } from '../pages/MojGreenKutakPage';

test('using The Product Search Field', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);

  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaPretragu();
  await searchPage.pretragaPojma('losion');
  const losionLinks = page.locator('//a[contains(text(),"Losion")]');
  const count = await losionLinks.count();

  for (let i = 0; i < count; i++) {
    const element = losionLinks.nth(i);
    await expect(element).toBeVisible(); 
    const text = await element.textContent();
    expect(text).toContain('Losion'); 
    }
})
  
test('using The Product Search Field Fail', async ({ page }) => {
  await page.goto('https://greenbsn.com/sr/');
  const searchField = page.locator('input[name="s"]').first(); 
  const searchTerm = 'loNsion'; 
  await searchField.fill(searchTerm);
  await searchField.press('Enter');
  await page.waitForLoadState('networkidle');
  const noPosts = page.locator('//p[text()="No posts were found."]');
  await expect(noPosts.first()).toBeVisible({ timeout: 5000 });
});

test('checking The Links In The Main Menu', async ({ page }) => {
  test.setTimeout(200000);
  await page.goto('https://greenbsn.com/sr/');
  const links = await page.$$eval('a', (as) => as.map(a => a.getAttribute('href')));

  for (const href of links) {
    if (!href || !href.startsWith('http')) continue; 

    try {
      const response = await fetch(href, { method: 'HEAD' });
      const status = response.status;
      expect(status, `Neispravan link: ${href} (kod: ${status})`).toBeLessThan(400);
    } catch (error) {
      throw new Error(`Greška pri proveri linka: ${href} (${error})`);
    }
  }
});

test('loading In English', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaMojGreenKutak();
  const newPage = await homePage.switchToNewlyOpenedTab(page);
  const mojGreenKutakPage = new MojGreenKutakPage(newPage);
  await mojGreenKutakPage.changeLanguageToEnglish();
  const forgotPasswordLink = newPage.locator("//a[text()='Forgot your password?']");
  await expect(forgotPasswordLink).toBeVisible({ timeout: 10000 });
});
