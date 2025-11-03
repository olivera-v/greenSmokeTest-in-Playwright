import test, { expect } from "@playwright/test";

test('Provera vremena učitavanja stranice', async ({ page }) => {
  const startTime = Date.now(); // početak merenja vremena

  await page.goto('https://greenbsn.com/sr/', { waitUntil: 'load' }); // otvaranje i čekanje da se stranica učita

  // dodatna sigurnost — proveri da je dokument potpuno učitan
  await page.waitForFunction(() => document.readyState === 'complete');

  const endTime = Date.now(); // kraj merenja
  const loadTime = endTime - startTime; // trajanje u milisekundama

  console.log(`⏱️ Vreme učitavanja stranice: ${loadTime} ms`);

  // Asertacija — očekujemo manje od 8000 ms (10 sekundi)
  expect(loadTime).toBeLessThan(10000);
});

test('Provera da nema JavaScript grešaka na stranici', async ({ page }) => {
  const jsErrors: string[] = [];

  // hvata sve konzolne poruke tokom testiranja
  page.on('console', msg => {
    if (msg.type() === 'error') {
      jsErrors.push(msg.text());
      console.error('⚠️ JavaScript greška:', msg.text());
    }
  });

  // otvori stranicu
  await page.goto('https://greenbsn.com/sr/', { waitUntil: 'load' });

  // proveri da li ima JS grešaka
  expect(jsErrors.length, `⚠️ JavaScript greške pronađene: ${jsErrors.join('\n')}`).toBe(0);
});