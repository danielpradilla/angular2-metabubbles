import { Angular2MetabubblesPage } from './app.po';

describe('angular2-metabubbles App', function() {
  let page: Angular2MetabubblesPage;

  beforeEach(() => {
    page = new Angular2MetabubblesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
