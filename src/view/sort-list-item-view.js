import AbstractView from '../framework/view/abstract-view';

function createSortListItemTemplate({type, isEnabled}, isChecked) {
  return `<div class="trip-sort__item  trip-sort__item--${type}">
            <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked ? 'checked' : ''} ${!isEnabled ? 'disabled' : ''}>
            <label class="trip-sort__btn" for="sort-day">${type}</label>
          </div>`;
}

export default class SortListItemView extends AbstractView {
  #sortType = null;
  #isChecked = false;

  constructor(sortType, isChecked) {
    super();

    this.#sortType = sortType;
    this.#isChecked = isChecked;
  }

  get template() {
    return createSortListItemTemplate(this.#sortType, this.#isChecked);
  }
}
