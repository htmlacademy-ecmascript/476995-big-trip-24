import AbstractView from '../framework/view/abstract-view';

function createTripEventsListItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class TripEventsListItemView extends AbstractView {
  get template() {
    return createTripEventsListItemTemplate();
  }
}
