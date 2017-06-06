import { RecipeBoxAngularPage } from './app.po';

describe('recipe-box-angular App', function() {
  let page: RecipeBoxAngularPage;

  beforeEach(() => {
    page = new RecipeBoxAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
