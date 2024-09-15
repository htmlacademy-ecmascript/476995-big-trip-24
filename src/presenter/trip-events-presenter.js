import { render, replace } from '../framework/render.js';
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
    const citiesList = this.#destinations.map((dest) => dest.name);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderTripEvent(this.#tripEvents[i], citiesList);
    }
  }

  #renderTripEvent(tripEvent, citiesList) {
    const tripEventsListItemComponent = new TripEventsListItemView();
    render(tripEventsListItemComponent, this.#tripEventsListViewComponent.element);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventView = new EventView(
      tripEvent,
      () => {
        replaceEventToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    );
    const eventOffers = this.#offers.find((offer) => offer.type === tripEvent.type).offers;
    const editFormView = new EditFormView(
      tripEvent, citiesList, eventOffers,
      () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    );

    render(eventView, tripEventsListItemComponent.element);

    function replaceEventToEditForm() {
      replace(editFormView, eventView);
    }

    function replaceEditFormToEvent() {
      replace(eventView, editFormView);
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
