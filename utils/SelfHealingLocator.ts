import { Locator, Page } from '@playwright/test';

export class SelfHealingLocator {
  private page: Page;
  private selectors: (() => Locator)[];

  constructor(page: Page, selectors: (() => Locator)[]) {
    this.page = page;
    this.selectors = selectors;
  }

  async getLocator(): Promise<Locator> {
    for (const getLocator of this.selectors) {
      try {
        const locator = getLocator();
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        return locator;
      } catch (error) {
        console.warn(`Locator not found, trying next...`);
      }
    }
    throw new Error('No valid locator found');
  }
}
