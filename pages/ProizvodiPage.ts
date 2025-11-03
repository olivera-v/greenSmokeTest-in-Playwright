import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProizvodiPage extends BasePage {
    readonly negaTela: Locator;
    readonly negaKose: Locator;
    readonly greenSunCare: Locator;
    readonly negaTela2: Locator;
    readonly negaKose2: Locator;
    readonly greenSunCare2: Locator;
    readonly linkZaKontakt: Locator;
    readonly linkZaProizvode: Locator;
  
   
constructor (page: Page) {
        super(page);
        this.negaTela = page.locator('//a[@href=\'https://greenbsn.com/sr/kolekcija/nega-tela/\']//span[normalize-space()=\'Nega tela\']');
        this.negaKose = page.locator('//a[@href=\'https://greenbsn.com/sr/kolekcija/nega-kose/\']//span[normalize-space()=\'Nega kose\']');
        this.greenSunCare = page.locator('//a[@href=\'https://greenbsn.com/sr/kolekcija/sun-care/\']//span[normalize-space()=\'Green SUN CARE\']');
        this.negaTela2 = page.locator('#nav-menu-item-944 a');
        this.negaKose2 = page.locator('#nav-menu-item-943 a');
        this.greenSunCare2 = page.locator('#nav-menu-item-3612 a');
        this.linkZaKontakt = page.locator('//a[contains(@href,\'/mreza\')]//span[contains(text(),\'Kontakt\')]');
        this.linkZaProizvode = page.locator('a:has(span:text("Nega tela"))').first();
}

async pregledProizvodaZaNeguTela() {
    await this.openDropdownAndSelectOption(this.linkZaProizvode, this.negaTela);
}

async pregledProizvodaZaNeguKose() {
    await this.openDropdownAndSelectOption(this.linkZaProizvode, this.negaKose);
}

async pregledProizvodaGreenSunCare() {
    await this.openDropdownAndSelectOption(this.linkZaProizvode, this.greenSunCare);
}

async ispisiKolekcije(): Promise<string[]> {
    await this.page.waitForTimeout(500);
    const items = await this.page.locator('li.menu-item-object-product_cat > a').all();
    const seenHrefs = new Set<string>();
    const uniqueNames: string[] = [];
    console.log('=== Spisak kolekcija ===');

    for (const item of items) {
      const name = await item.locator('span').innerText().catch(() => '');
      const href = await item.getAttribute('href');

      if (!href) continue;

      if (seenHrefs.has(href)) continue;
      seenHrefs.add(href);
      uniqueNames.push(name);

      const parts = href.split('/');
      const lastPart = parts[parts.length - 1] || parts[parts.length - 2];

      console.log(`${name} -> ${lastPart}`);
    }

    console.log('=== Kraj spiska ===');
    return uniqueNames;
  }
}


