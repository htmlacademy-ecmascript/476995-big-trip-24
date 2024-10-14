import { render, replace, remove } from '../framework/render.js';
import { UpdateType } from '../constants.js';
import { filter } from '../utils/filter.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = null;

  #filterModel = null;
  #tripEventsModel = null;

  constructor(filtersContainer, filterModel, tripEventsModel) {
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;
    this.#tripEventsModel = tripEventsModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tripEvents = this.#tripEventsModel.tripEvents;

    return Object.entries(filter).map(
      ([filterType, filterEvents]) => ({
        type: filterType,
        isDisabled: filterEvents(tripEvents).length === 0,
      }),
    );
  }

  init() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView(this.filters, this.#filterModel.filter, this.#handleFilterChange);
    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
