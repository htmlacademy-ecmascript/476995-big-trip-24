import { render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import EventView from '../view/event-view.js';

export default class TripEventsPresenter {
  #tripEventsListContainer = null;
  #tripEventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripEventsListViewComponent = new TripEventsListView();

  #tripEvents = [];
  #destinations = [];
  #offers = [];

  constructor(tripEventsListContainer, tripEventsModel, destinationsModel, offersModel) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripEvents = this.#tripEventsModel.tripEvents;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    render(this.#tripEventsListViewComponent, this.#tripEventsListContainer);

    this.#tripEvents = this.enrichEvents(this.#tripEvents);
    for (let i = 0; i < this.#tripEvents.length; i++) {
      const tripEventsListItemComponent = new TripEventsListItemView();
      render(tripEventsListItemComponent, this.#tripEventsListViewComponent.element);
      render(new EventView(this.#tripEvents[i]), tripEventsListItemComponent.element);

      if (i === 0) {
        const citiesList = this.#destinations.map((dest) => dest.name);
        const eventOffers = this.#offers.find((offer) => offer.type === this.#tripEvents[i].type).offers;

        const editTripEventsListItemComponent = new TripEventsListItemView();
        render(editTripEventsListItemComponent, this.#tripEventsListViewComponent.element);
        render(new EditFormView(this.#tripEvents[i], citiesList, eventOffers), editTripEventsListItemComponent.element);
      }
    }
  }

  enrichEvents(tripEvents) {
    return tripEvents.map((tripEvent) => {
      const destinationData = this.#destinations.find((dest) => dest.id === tripEvent.destination);
      const selectedOffers = this.#offers
        .find((offer) => offer.type === tripEvent.type)
        .offers
        .filter((offer) => tripEvent.offers.includes(offer.id));

      return { ...tripEvent, destinationData, selectedOffers };
    });
  }
}
