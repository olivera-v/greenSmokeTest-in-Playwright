import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MrezaNSPage extends BasePage {
    readonly address: Locator;
    readonly landlinePhone: Locator;
    readonly email: Locator;
    readonly facebook: Locator;
    readonly diskontNS: Locator;
   
constructor (page: Page) {
        super(page);
        this.address = page.locator('//h4[contains(text(), \'Romanijska 2\')]');
        this.landlinePhone = page.locator('//h4[contains(text(), \'Romanijska 2\')]').first();
        this.email = page.locator('//a[contains(text(), \'@greenbsn.com\')]').first();
        this.facebook = page.locator('//a[contains(@href, \'facebook.com\') or contains(@href, \'fb/greenbsn\')]').first();
        this.diskontNS = page.locator('//a[contains(@href,"/mreza/novi-sad/")]/span[text()="Diskont Novi Sad"]').first();
}

async verifyFacebookLink(): Promise<boolean> {
    const fb = this.facebook;
    await fb.waitFor({ state: 'visible', timeout: 5000 });
    const href = await fb.getAttribute('href');
    return !!href && href.includes('facebook.com');
}

async verifyEmailLink(): Promise<boolean> {
    const href = await this.email.getAttribute('href');
    return !!href && href.includes('mailto:');
}

get addressLink() {
    return this.address;
}

get landlinePhoneLink() {
    return this.landlinePhone;
}

get fbLink() {
    return this.facebook;
}

get DiskontNS() {
    return this.diskontNS;
}

}

