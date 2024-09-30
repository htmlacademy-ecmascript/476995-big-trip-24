import { render } from '../framework/render.js';
import { SortType } from '../constants.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils/sort.js';
import TripEventPresenter from './trip-event-presenter.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortListView from '../view/sort-list-view.js';
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

  #currentSortType = SortType.DAY;
  #tripEventPresenters = new Map();

  constructor(tripEventsListContainer, tripEventsModel, destinationsModel, offersModel) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    if (this.#tripEventsModel.tripEvents.length > 0) {
      this.#tripEvents = this.#tripEventsModel.tripEvents;
      this.#sortTripEvents(this.#currentSortType);
      this.#destinations = this.#destinationsModel.destinations;
      this.#offers = this.#offersModel.offers;

      this.#citiesList = this.#destinations.map((dest) => dest.name);
      this.#tripEvents = this.#enrichEvents(this.#tripEvents);

      this.#renderSortList();
      render(this.#tripEventsListViewComponent, this.#tripEventsListContainer);
      this.#renderTripEvents();
    } else {
      render(new ListEmptyView(), this.#tripEventsListContainer);
    }
  }

  #renderSortList() {
    const sortListView = new SortListView(this.#handleSortTypeChange);
    render(sortListView, this.#tripEventsListContainer);
  }

  #renderTripEvents() {
    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderTripEvent(this.#tripEvents[i]);
    }
  }

  #renderTripEvent(tripEvent) {
    const eventOffers = this.#offers.find((offer) => offer.type === tripEvent.type).offers;

    const tripEventPresenter = new TripEventPresenter(this.#tripEventsListViewComponent.element, this.#citiesList, eventOffers,
      this.#handleUpdateTripEvent, this.#handleStateChange
    );
    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripEvents(sortType);
    this.#clearEventsList();
    this.#renderTripEvents();
  };

  #handleUpdateTripEvent = (updatedEvent) => {
    this.#tripEvents = this.#tripEvents.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
    this.#tripEventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleStateChange = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.setDefaultState());
  };

  #sortTripEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#tripEvents.sort(sortByDate);
        break;
      case SortType.TIME:
        this.#tripEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripEvents.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #clearEventsList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }

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
