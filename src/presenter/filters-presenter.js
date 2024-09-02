import { render } from '../render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  filtersViewComponent = new FiltersView();

  constructor(filtersContainer) {
    this.filtersContainer = filtersContainer;
  }

  init() {
    render(this.filtersViewComponent, this.filtersContainer);
  }
}
