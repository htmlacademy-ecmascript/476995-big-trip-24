import { createElement } from '../render.js';

function createFiltersTemplate() {
  return '<form class="trip-filters" action="#" method="get"></form>';
}

export default class FiltersView {
  getTemplate() {
    return createFiltersTemplate();
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
