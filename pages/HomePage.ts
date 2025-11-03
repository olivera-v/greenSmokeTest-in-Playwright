import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    readonly linkZaMojGreenKutak: Locator;
    readonly linkZaPretragu: Locator;
    readonly linkZaGreen: Locator;
    readonly linkZaOKompaniji: Locator;
    readonly linkZaOProizvodima: Locator;
    readonly linkZaSertifikate: Locator;
    readonly linkZaProizvode: Locator;
    readonly linkZaKontakt: Locator;

    constructor (page: Page) {
        super(page);
        this.linkZaMojGreenKutak = page.locator('//*[text()="Moj Green kutak"]');
        this.linkZaPretragu = page.locator('//*[@class="qode_icon_font_elegant icon_search "]').first();
        this.linkZaGreen = page.locator('//a[@href="https://greenbsn.com/sr/" and contains(@class, "current")]/span[text()="Green"]').nth(0);
        this.linkZaOKompaniji = page.locator('//a[@href="https://greenbsn.com/sr/green/vizija/"]/span[text()="O kompaniji"]').nth(0);
        this.linkZaOProizvodima = page.locator('//a[@href="https://greenbsn.com/sr/green/o-green-proizvodima/"]/span[text()="O Green proizvodima"]').nth(0);
        this.linkZaSertifikate = page.locator('//a[@href="https://greenbsn.com/sr/green/sertifikati/"]/span[text()="Sertifikati"]').nth(0);
        this.linkZaProizvode = page.locator('#nav-menu-item-892 > a');
        this.linkZaKontakt = page.locator('//a[contains(@href,\'/mreza\')]//span[contains(text(),\'Kontakt\')]').first();
    }

    async setLinkZaMojGreenKutak () {
        await this.linkZaMojGreenKutak.click();
    }

    public getLinkZaMojGreenKutak(): Locator {
     return this.linkZaMojGreenKutak;
    }

    public getLinkZaPretragu(): Locator {
     return this.linkZaPretragu;
    }
    
    public getLinkZaProizvode(): Locator {
     return this.linkZaProizvode;
    }

    async isLinkZaMojGreenKutakPresent (): Promise<boolean> {
      return await this.linkZaMojGreenKutak.isVisible();
    }

    async isLinkZaPretraguPresent (): Promise<boolean> {
        return await this.linkZaPretragu.isVisible();
        }

    async isLinkZaProizvodePresent (): Promise<boolean> {
        return await this.linkZaProizvode.isVisible();
        }

    async setLinkZaPretragu () {
            await this.linkZaPretragu.click();
        }

    async setLinkZaProizvode () {
        await this.linkZaProizvode.click();
    }

    async setLinkZaKontakt () {
        await this.linkZaKontakt.click();
    }

    async hoverLinkZaProizvode () {
        await this.hoverOverElement(this.linkZaProizvode);
    }


    async holerLinkZaKontakt () {
        await this.hoverOverElement(this.linkZaKontakt);
    }

    async setLinkZaOKompaniji () {
        await this.openDropdownAndSelectOption(this.linkZaGreen, this.linkZaOKompaniji);
    }

    async setLinkZaOProizvodima () {
        await this.linkZaOProizvodima.waitFor({ state: 'visible', timeout: 15000 });
        await this.openDropdownAndSelectOption(this.linkZaGreen, this.linkZaOProizvodima);
    }

    async setLinkZaSertifikate () {
        await this.openDropdownAndSelectOption(this.linkZaGreen, this.linkZaSertifikate);
    }

    get uzmiLinkZaKontakt(): Locator {
        return this.linkZaKontakt;
    }

}