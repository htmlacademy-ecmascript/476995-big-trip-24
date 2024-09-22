import { render } from '../framework/render.js';
import { SortingType } from '../constants.js';
import SortListView from '../view/sort-list-view.js';
import SortListItemView from '../view/sort-list-item-view.js';

export default class SortListPresenter {
  #sortListContainer = null;
  #sortListViewComponent = new SortListView();

  #sortingTypes = [];

  constructor(sortListContainer, sortingTypes) {
    this.#sortListContainer = sortListContainer;
    this.#sortingTypes = sortingTypes;
  }

  init() {
    render(this.#sortListViewComponent, this.#sortListContainer);

    for (let i = 0; i < this.#sortingTypes.length; i++) {
      this.#renderSortingType(this.#sortingTypes[i]);
    }
  }

  #renderSortingType(sortingType) {
    const sortListItemView = new SortListItemView(sortingType, sortingType.type === SortingType.DAY);

    render(sortListItemView, this.#sortListViewComponent.element);
  }
}
