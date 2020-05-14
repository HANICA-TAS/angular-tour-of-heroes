import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getHeroAt(index) {
    return element.all(by.css('app-dashboard div a div h4')).get(index).getText() as Promise<string>;
  }
}
