import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../constants.js';

function createSortListTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
              <input id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
                value="sort-${SortType.DAY}" checked data-sort-type="${SortType.DAY}">
              <label class="trip-sort__btn" for="sort-${SortType.DAY}">${SortType.DAY}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
              <input id="sort-${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
                value="sort-${SortType.EVENT}" data-sort-type="${SortType.EVENT}" disabled>
              <label class="trip-sort__btn" for="sort-${SortType.EVENT}">${SortType.EVENT}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
              <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
                value="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}">
              <label class="trip-sort__btn" for="sort-${SortType.TIME}">${SortType.TIME}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
              <input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
                value="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}">
              <label class="trip-sort__btn" for="sort-${SortType.PRICE}">${SortType.PRICE}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}">
              <input id="sort-${SortType.OFFERS}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
                value="sort-${SortType.OFFERS}" data-sort-type="${SortType.OFFERS}" disabled>
              <label class="trip-sort__btn" for="sort-${SortType.OFFERS}">${SortType.OFFERS}</label>
            </div>
          </form>`;
}

export default class SortListView extends AbstractView {
  #handerSortTypeChange = null;

  constructor(onSortTypeChange) {
    super();

    this.#handerSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortListTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__input')) {
      return;
    }

    evt.preventDefault();
    this.#handerSortTypeChange(evt.target.dataset.sortType);
  };
}
