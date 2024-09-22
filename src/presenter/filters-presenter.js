import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import FilterView from '../view/filter-view.js';
import { FilterType } from '../constants.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersViewComponent = new FiltersView();

  #filters = [];

  constructor(filtersContainer, filters) {
    this.#filtersContainer = filtersContainer;
    this.#filters = filters;
  }

  init() {
    render(this.#filtersViewComponent, this.#filtersContainer);

    for (let i = 0; i < this.#filters.length; i++) {
      this.#renderFilter(this.#filters[i]);
    }
  }

  #renderFilter(filter) {
    const filterView = new FilterView(filter, filter.type === FilterType.EVERYTHING);

    render(filterView, this.#filtersViewComponent.element);
  }
}
