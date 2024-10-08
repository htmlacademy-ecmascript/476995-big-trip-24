import { render } from '../framework/render.js';
import { SortType, UserAction, UpdateType } from '../constants.js';
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

  #destinations = [];
  #offers = [];

  #currentSortType = SortType.DAY;
  #tripEventPresenters = new Map();

  constructor(tripEventsListContainer, tripEventsModel, destinationsModel, offersModel) {
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    if (this.#tripEventsModel.tripEvents.length > 0) {
      this.#renderSortList();
      render(this.#tripEventsListViewComponent, this.#tripEventsListContainer);
      this.#renderTripEvents();
    } else {
      render(new ListEmptyView(), this.#tripEventsListContainer);
    }
  }

  get tripEvents() {
    const tripEvents = [...this.#tripEventsModel.tripEvents];

    switch (this.#currentSortType) {
      case SortType.DAY:
        return tripEvents.sort(sortByDate);
      case SortType.TIME:
        return tripEvents.sort(sortByTime);
      case SortType.PRICE:
        return tripEvents.sort(sortByPrice);
    }

    return tripEvents;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #handleViewAction = (actionType, updateType, eventToUpdate) => {
    switch (actionType) {
      case UserAction.ADD_TASK:
        this.#tripEventsModel.addEvent(updateType, eventToUpdate);
        break;
      case UserAction.UPDATE_TASK:
        this.#tripEventsModel.updateEvent(updateType, eventToUpdate);
        break;
      case UserAction.DELETE_TASK:
        this.#tripEventsModel.deleteEvent(updateType, eventToUpdate);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedEvent) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#tripEventPresenters.get(updatedEvent.id).init(updatedEvent);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #renderSortList() {
    const sortListView = new SortListView(this.#handleSortTypeChange);
    render(sortListView, this.#tripEventsListContainer);
  }

  #renderTripEvents() {
    for (let i = 0; i < this.tripEvents.length; i++) {
      this.#renderTripEvent(this.tripEvents[i]);
    }
  }

  #renderTripEvent(tripEvent) {
    const tripEventPresenter = new TripEventPresenter(this.#tripEventsListViewComponent.element, this.destinations,
      this.offers, this.#handleViewAction, this.#handleStateChange
    );
    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenters.set(tripEvent.id, tripEventPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderTripEvents();
  };

  #handleStateChange = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.setDefaultState());
  };

  #clearEventsList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }
}
