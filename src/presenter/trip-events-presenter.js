import { remove, render } from '../framework/render.js';
import { SortType, UserAction, UpdateType, FilterType } from '../constants.js';
import { filter } from '../utils/filter.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils/sort.js';
import AddEventPresenter from './add-event-presenter.js';
import TripEventPresenter from './trip-event-presenter.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortListView from '../view/sort-list-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';

export default class TripEventsPresenter {
  #tripEventsListContainer = null;
  #tripEventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #sortComponent = null;
  #tripEventsListViewComponent = new TripEventsListView();
  #noTripEventsComponent = null;

  #currentSortType = SortType.DAY;
  #addEventPresenter = null;
  #tripEventPresenters = new Map();

  constructor(tripEventsListContainer, tripEventsModel, destinationsModel, offersModel, filterModel, onAddTaskDestroy) {
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#addEventPresenter = new AddEventPresenter(this.#tripEventsListViewComponent.element, this.destinations, this.offers,
      this.#handleViewAction, onAddTaskDestroy);

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
    const filterType = this.#filterModel.filter;
    const tripEvents = this.#tripEventsModel.tripEvents;
    const filteredEvents = filter[filterType](tripEvents);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortByDate);
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return tripEvents;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init() {
    this.#renderTripEventsBoard();
  }

  addTripEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addEventPresenter.init();
  }

  #handleViewAction = (actionType, updateType, eventToUpdate) => {
    switch (actionType) {
      case UserAction.ADD_EVENT:
        this.#tripEventsModel.addEvent(updateType, eventToUpdate);
        break;
      case UserAction.UPDATE_EVENT:
        this.#tripEventsModel.updateEvent(updateType, eventToUpdate);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripEventsModel.deleteEvent(updateType, eventToUpdate);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedEvent) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(updatedEvent.id).init(updatedEvent);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderTripEventsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList(true);
        this.#renderTripEventsBoard();
        break;
    }
  };

  #renderTripEventsBoard() {
    if (this.#tripEventsModel.tripEvents.length === 0) {
      this.#noTripEventsComponent = new ListEmptyView(this.#filterModel.filter);
      render(this.#noTripEventsComponent, this.#tripEventsListContainer);

      return;
    }

    this.#renderSortList();
    render(this.#tripEventsListViewComponent, this.#tripEventsListContainer);
    this.#renderTripEvents();
  }

  #renderSortList() {
    this.#sortComponent = new SortListView(this.#currentSortType, this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripEventsListContainer);
  }

  #renderTripEvents() {
    const tripEvents = this.tripEvents;

    for (let i = 0; i < tripEvents.length; i++) {
      this.#renderTripEvent(tripEvents[i]);
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
    this.#renderTripEventsBoard();
  };

  #handleStateChange = () => {
    this.#addEventPresenter.destroy();
    this.#tripEventPresenters.forEach((presenter) => presenter.setDefaultState());
  };

  #clearEventsList(resetSort = false) {
    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    remove(this.#sortComponent);
    this.#addEventPresenter.destroy();
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();

    if (resetSort) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
