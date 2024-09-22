import AbstractView from '../framework/view/abstract-view';

function createFilterTemplate({ type, isDisabled }, isChecked) {
  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
              value="${type}" ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
          </div>`;
}

export default class FilterView extends AbstractView {
  #filter = {};
  #isChecked = false;

  constructor(filter, isChecked) {
    super();

    this.#filter = filter;
    this.#isChecked = isChecked;
  }

  get template() {
    return createFilterTemplate(this.#filter, this.#isChecked);
  }
}
