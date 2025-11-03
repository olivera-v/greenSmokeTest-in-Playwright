import { test, expect } from '@playwright/test';
import https from 'https';
import { TLSSocket } from 'tls';
import { HomePage } from '../pages/HomePage';
import { MojGreenKutakPage } from '../pages/MojGreenKutakPage';

test('opening HomePage', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');

  await homePage.linkZaMojGreenKutak.waitFor({ state: 'visible' });
  await homePage.linkZaPretragu.waitFor({ state: 'visible' });
  await homePage.linkZaProizvode.waitFor({ state: 'visible' });

  const isGreenKutakVisible = await homePage.isLinkZaMojGreenKutakPresent();
  const isLinkZaPretraguVisible = await homePage.isLinkZaPretraguPresent();
  const isLinkZaProizvodeVisible = await homePage.isLinkZaProizvodePresent();

  expect(isGreenKutakVisible && isLinkZaPretraguVisible && isLinkZaProizvodeVisible).toBeTruthy();
});

test('navigation To About Company', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaOKompaniji();
  const currentURL = page.url();
  expect(currentURL).toContain('/green/vizija');
});

test('navigation To About Products', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaOProizvodima();
  const currentURL = page.url();
  expect(currentURL).toContain('o-green-proizvodima/');
});

test('navigation To Sertifikates', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaSertifikate();
  const currentURL = page.url();
  expect(currentURL).toContain('green/sertifikati/');
});

test('Verify that the website uses HTTPS and has a valid SSL certificate ', async ({ page }) => {
  const websiteUrl = 'https://greenbsn.com/sr/';

  // 🔹 Provera SSL sertifikata
  await new Promise<void>((resolve, reject) => {
    const req = https.get(websiteUrl, (res) => {
      const socket = res.socket as TLSSocket; // 👈 cast na TLSSocket
      const cert = socket.getPeerCertificate();

      if (!cert || Object.keys(cert).length === 0) {
        reject('❌ No certificate found!');
        return;
      }

      const validTo = new Date(cert.valid_to);
      const now = new Date();

      expect(validTo > now).toBeTruthy();

      console.log(`✅ Certificate valid until: ${validTo.toISOString()}`);
      console.log(`🔹 Issued by: ${cert.issuer.O}`);
      console.log(`🔹 Issued to: ${cert.subject.CN}`);

      res.resume();
      resolve();
    });

    req.on('error', reject);
    req.end();
  });

  // 🔹 Provera da li se sajt uspešno učitava
  const response = await page.goto(websiteUrl + '/sr/', { waitUntil: 'domcontentloaded' });
  console.log(`HTTP status: ${response?.status()} | URL: ${page.url()}`);
  expect(page.url().startsWith('https://')).toBeTruthy();

  console.log(`✅ Page loaded successfully: ${page.url()}`);
});

test('successful Login', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaMojGreenKutak();
  const newPage = await homePage.switchToNewlyOpenedTab(page);
  const mojGreenKutakPage = new MojGreenKutakPage(newPage);
  await mojGreenKutakPage.logovanje('1-0008826', 'olivera');

  const currentURL = await newPage.url();
  expect(currentURL).toBe('https://my.greenbsn.com/myOrders.php');
});

test('unsuccessful Login', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://greenbsn.com/sr/');
  await homePage.setLinkZaMojGreenKutak();
  const newPage = await homePage.switchToNewlyOpenedTab(page);
  const mojGreenKutakPage = new MojGreenKutakPage(newPage);
  await mojGreenKutakPage.logovanje('nesto', 'nesto');

  const currentURL = await newPage.url();
  expect(currentURL).toBe('https://my.greenbsn.com/login.php');
});
