import AbstractView from '../framework/view/abstract-view';

function createFilterTemplate() {
  return `<div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>`;
}

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
