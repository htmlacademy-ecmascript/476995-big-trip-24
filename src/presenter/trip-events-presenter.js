import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddFormView from '../view/add-form-view.js';
import EventView from '../view/event-view.js';

export default class TripEventsPresenter {
  AMOUNT_TRIP_EVENTS = 4;
  tripEventsListViewComponent = new TripEventsListView();

  constructor(tripEventsListContainer) {
    this.tripEventsListContainer = tripEventsListContainer;
  }

  init() {
    render(this.tripEventsListViewComponent, this.tripEventsListContainer);

    for (let i = 0; i < this.AMOUNT_TRIP_EVENTS; i++) {
      const tripEventsListItemComponent = new TripEventsListItemView();
      render(tripEventsListItemComponent, this.tripEventsListViewComponent.getElement());
      if (i === 0) {
        render(new AddFormView(), tripEventsListItemComponent.getElement());
      } else {
        render(new EventView(), tripEventsListItemComponent.getElement());
      }
    }
  }
}
