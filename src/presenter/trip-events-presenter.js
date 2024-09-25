import { render } from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter.js';
import TripEventsListView from '../view/trip-events-list-view.js';

export default class TripEventsPresenter {
  #tripEventsListContainer = null;
  #tripEventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripEventsListViewComponent = new TripEventsListView();

  #tripEvents = [];
  #destinations = [];
  #offers = [];
  #citiesList = [];

  #tripEventPresenters = new Map();

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

    this.#citiesList = this.#destinations.map((dest) => dest.name);
    this.#tripEvents = this.#enrichEvents(this.#tripEvents);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderTripEvent(this.#tripEvents[i]);
    }
  }

  #renderTripEvent(tripEvent) {
    const eventOffers = this.#offers.find((offer) => offer.type === tripEvent.type).offers;

    const tripEventPresenter = new TripEventPresenter(this.#tripEventsListViewComponent.element, this.#citiesList, eventOffers,
      this.#handleUpdateTripEvent
    );
    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
  }

  #handleUpdateTripEvent = (updatedEvent) => {
    this.#tripEvents = this.#tripEvents.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
    this.#tripEventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #enrichEvents(tripEvents) {
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
