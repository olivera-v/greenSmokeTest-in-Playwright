import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProizvodiPage } from "../pages/ProizvodiPage";
import { SunCareProductsPage } from "../pages/SunCareProductsPage";
import { SunCareSPF15Page } from "../pages/SunCareSPF15Page";

test('Check Colections', async ({ page }) => {
  const homePage = new HomePage(page);
  const proizvodiPage = new ProizvodiPage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.hoverLinkZaProizvode();
  const kolekcije: string[] = await proizvodiPage.ispisiKolekcije();
  console.log('Lista kolekcija:', kolekcije);
  expect(kolekcije).toHaveLength(10);
});

test('bodyCareCollectionLaunch', async ({ page }) => {
  const homePage = new HomePage(page);  
  const proizvodiPage = new ProizvodiPage(page);

  await page.goto('https://greenbsn.com/sr/');
  await homePage.linkZaProizvode.hover();
  await proizvodiPage.negaTela2.click();
  await expect(page).toHaveURL(/.*nega-tela/);
});

test('hairCareCollectionLaunch', async ({ page }) => {
  const homePage = new HomePage(page);  
  const proizvodiPage = new ProizvodiPage(page);

  await page.goto('https://greenbsn.com/sr/');
  await homePage.linkZaProizvode.hover();
  await proizvodiPage.negaKose2.click();
  await expect(page).toHaveURL(/.*nega-kose/);
});

test('displey Title, Price & Description Check', async ({ page }) => {
  const homePage = new HomePage(page);
  const proizvodiPage = new ProizvodiPage(page);
  const sunCareProductsPage = new SunCareProductsPage(page);
  const sunCareSPF15Page = new SunCareSPF15Page(page);
  
  await page.goto('https://greenbsn.com/sr/');
  await homePage.linkZaProizvode.hover();
  await proizvodiPage.greenSunCare2.click();
  await sunCareProductsPage.mlekoSPF15.click();

  const title = await sunCareSPF15Page.title.innerText();
  const price = await sunCareSPF15Page.price.innerText();
  const description = await sunCareSPF15Page.description.innerText();

// Asertacije
  await expect(title).toBe('Mleko za sunčanje SPF 15');
  await expect(price).toContain('1.656');
  await expect(description).toContain('Mleko u spreju');
  });

test('navigate Through Pages To Product', async ({ page }) => {
  const homePage = new HomePage(page);
  const proizvodiPage = new ProizvodiPage(page);
  const sunCareProductsPage = new SunCareProductsPage(page);
    
  await page.goto('https://greenbsn.com/sr/');
  await homePage.linkZaProizvode.hover();
  await proizvodiPage.greenSunCare2.click();
  await sunCareProductsPage.losionPosleSuncanja.click();
  const currentURL = await page.url();
  expect(currentURL).toContain('losion-posle-suncanja/');
  });


