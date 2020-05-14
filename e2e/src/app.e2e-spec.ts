import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Tour of Heroes');
  });


  it('should display four specific Heroes', () => {
    page.navigateTo();
    expect(page.getHeroAt(0)).toEqual("Narco");
    expect(page.getHeroAt(1)).toEqual("Bombasto");
    expect(page.getHeroAt(2)).toEqual("Celeritas");
    expect(page.getHeroAt(3)).toEqual("Magneta");

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
