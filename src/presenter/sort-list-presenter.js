import { render } from '../framework/render.js';
import SortListView from '../view/sort-list-view.js';

export default class SortListPresenter {
  #sortListContainer = null;
  #sortListViewComponent = new SortListView();

  constructor(sortListContainer) {
    this.#sortListContainer = sortListContainer;
  }

  init() {
    render(this.#sortListViewComponent, this.#sortListContainer);
  }
}
