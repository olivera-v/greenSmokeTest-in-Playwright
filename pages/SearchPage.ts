import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
    readonly searchField: Locator;
    
  
   
constructor (page: Page) {
        super(page);
        this.searchField = page.locator('//*[@type="text"]').nth(1);
}

async pretragaPojma( pojam: string) {
    await this.fill(this.searchField, pojam);
}
}