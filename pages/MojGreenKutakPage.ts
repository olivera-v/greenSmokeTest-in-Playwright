import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MojGreenKutakPage extends BasePage {
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly prijavaBtn: Locator;
    readonly languageChangeBtn: Locator;
    readonly englishLng: Locator;

    constructor (page: Page) {
        super(page);
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.prijavaBtn = page.locator('#login-submit');
        this.languageChangeBtn = page.locator('#s2id_autogen1');
        this.englishLng = page.locator('div.select2-result-label', { hasText: 'English' });
    }
    
    async logovanje (username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.prijavaBtn.click();
    }

    async changeLanguageToEnglish() {
    const languageDropdown = this.languageChangeBtn; 
    await languageDropdown.click();
    const englishOption = this.page.locator('div.select2-result-label >> text=English');
    await expect(englishOption).toBeVisible({ timeout: 10000 });
    await englishOption.click();
    await this.page.waitForLoadState('networkidle');
  }

}