import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SunCareProductsPage extends BasePage {
    readonly mlekoSPF15: Locator;
    readonly losionPosleSuncanja: Locator;
    
  
   
constructor (page: Page) {
        super(page);
        this.mlekoSPF15 = page.locator('//*[@href="https://greenbsn.com/sr/proizvod/mleko-za-suncanje-spf-15/"]').nth(1);
        this.losionPosleSuncanja = page.locator('img[alt="Losion posle sunčanja"]');
}

async pregledProizvodaMlekoSPF15 () {
    await this.mlekoSPF15.click();
}

async pregledProizvodaLosionPosleSuncanja () {
    await this.losionPosleSuncanja.click();
}

}