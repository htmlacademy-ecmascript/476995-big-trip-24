import { createElement } from '../render.js';

function createSortListTemplate() {
  return '<form class="trip-events__trip-sort  trip-sort" action="#" method="get">';
}

export default class SortListView {
  getTemplate() {
    return createSortListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
