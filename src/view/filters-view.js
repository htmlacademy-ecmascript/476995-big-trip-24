import AbstractView from '../framework/view/abstract-view';

function createFilterTemplate({ type, isDisabled }, currentFilter) {
  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
              value="${type}" ${isDisabled ? 'disabled' : ''} ${type === currentFilter ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
          </div>`;
}

function createFiltersTemplate(filters, currentFilter) {
  const filterListHtml = filters
    .map((filter) => createFilterTemplate(filter, currentFilter))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
            ${filterListHtml}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor(filters, currentFilter, onFilterTypeChange) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();

    this.#handleFilterTypeChange(evt.target.value);
  };
}
