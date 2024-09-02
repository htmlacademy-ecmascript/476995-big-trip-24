import { createElement } from '../render.js';

function createTripEventsListItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class TripEventsListItemView {
  getTemplate() {
    return createTripEventsListItemTemplate();
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
