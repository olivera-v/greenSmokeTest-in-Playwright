import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MrezaPage extends BasePage {
    readonly inputField: Locator;
  
   
constructor (page: Page) {
        super(page);
        this.inputField = page.locator('#email');
}

get emailInput() {
  return this.page.locator('input[name="email"]');
}

}