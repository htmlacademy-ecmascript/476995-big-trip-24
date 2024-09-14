import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersViewComponent = new FiltersView();

  constructor(filtersContainer) {
    this.#filtersContainer = filtersContainer;
  }

  init() {
    render(this.#filtersViewComponent, this.#filtersContainer);
  }
}
