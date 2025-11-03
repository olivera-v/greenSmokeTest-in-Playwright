import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SunCareSPF15Page extends BasePage {
    readonly title: Locator;
    readonly price: Locator;
    readonly description: Locator;
    
  
   
constructor (page: Page) {
        super(page);
        this.title = page.locator('//h1[@class="product_title entry-title"]');
        this.price = page.locator('bdi', { hasText: '1.656,00' });
        this.description = page.locator('//p[contains(text(),\'Mleko u spreju za srednju zaštitu\')]');
}

}