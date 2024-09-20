import AbstractView from '../framework/view/abstract-view';

function createFiltersTemplate() {
  return `<form class="trip-filters" action="#" method="get">
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
