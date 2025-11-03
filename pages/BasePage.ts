import { Page, Locator, expect, BrowserContext } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://greenbsn.com/sr/'; 
  }

  async goto(url: string) {
    await this.page.goto(this.baseUrl + url);
  }

  async click(element: Locator) {
    await element.click();
  }

  async fill(element: Locator, text: string) {
    await element.fill(text);
  }

  async getText(element: Locator): Promise<string> {
    return await element.textContent() ?? '';
  }

  async expectVisible(element: Locator) {
    await expect(element).toBeVisible();
  }

  async isElementPresent(page: Page, selector: string): Promise<boolean> {
   const elements = await page.$$(selector);
   return elements.length > 0;
  }

  public async hoverOverElement(locator: Locator): Promise<void> {
      await locator.waitFor({ state: 'visible' });
      await locator.hover();
  }

  async openDropdownAndSelectOption(mainMenuLocator: Locator, optionLocator: Locator) {
    await mainMenuLocator.hover();
    await expect(optionLocator).toBeVisible({ timeout: 10000 });
    await optionLocator.click();
    await this.page.waitForLoadState('networkidle');
}
  
async switchToNewlyOpenedTab(page: Page): Promise<Page> {
  const context = page.context();
  await context.waitForEvent('page', { timeout: 10000 });
  const pages = context.pages();
  const newPage = pages.find(p => p !== page);
  if (!newPage) throw new Error('Novi tab nije pronađen');
  await newPage.waitForLoadState('load');
  return newPage;
}

}