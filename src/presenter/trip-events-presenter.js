import { remove, render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SortType, UserAction, UpdateType, FilterType } from '../constants.js';
import { filter } from '../utils/filter.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils/sort.js';
import AddEventPresenter from './add-event-presenter.js';
import TripEventPresenter from './trip-event-presenter.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadDataView from '../view/failed-load-data-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortListView from '../view/sort-list-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripEventsPresenter {
  #tripEventsListContainer = null;
  #filterModel = null;
  #tripEventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #loadingComponent = new LoadingView();
  #failedLoadDataComponent = new FailedLoadDataView();
  #noTripEventsComponent = null;
  #tripEventsListViewComponent = new TripEventsListView();
  #sortComponent = null;

  #handleAddEventFormClose = null;

  #isLoading = true;
  #currentSortType = SortType.DAY;
  #addEventPresenter = null;
  #tripEventPresenters = new Map();

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(tripEventsListContainer, tripEventsModel, destinationsModel, offersModel, filterModel, onAddEventFormClose) {
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#handleAddEventFormClose = onAddEventFormClose;

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
    this.#addEventPresenter = new AddEventPresenter(this.#tripEventsListViewComponent.element, this.destinations, this.offers,
      this.#handleViewAction, this.#handleAddEventDestroy);

    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    if (this.#sortComponent === null) {
      this.#renderSortList();
    }
    this.#renderTripEventsContainer();

    this.#addEventPresenter.init();
  }

  showError() {
    this.#isLoading = false;
    remove(this.#loadingComponent);
    render(this.#failedLoadDataComponent, this.#tripEventsListContainer);
  }

  #handleViewAction = async (actionType, updateType, eventToUpdate) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.ADD_EVENT:
        this.#addEventPresenter.setSaving();
        try {
          await this.#tripEventsModel.addEvent(updateType, eventToUpdate);
        } catch (err) {
          this.#addEventPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE_EVENT:
        this.#tripEventPresenters.get(eventToUpdate.id).setSaving();
        try {
          await this.#tripEventsModel.updateEvent(updateType, eventToUpdate);
        } catch (err) {
          this.#tripEventPresenters.get(eventToUpdate.id).setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#tripEventPresenters.get(eventToUpdate.id).setDeleting();
        try {
          await this.#tripEventsModel.deleteEvent(updateType, eventToUpdate);
        } catch (err) {
          this.#tripEventPresenters.get(eventToUpdate.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updatedEvent) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(updatedEvent.id).init(updatedEvent);
        break;
      case UpdateType.MINOR:
        this.#clearTripEventsBoard();
        this.#renderTripEventsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEventsBoard(true);
        this.#renderTripEventsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripEventsBoard();
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsListContainer);
  }

  #renderNoTripEventsMessage() {
    this.#noTripEventsComponent = new ListEmptyView(this.#filterModel.filter);
    render(this.#noTripEventsComponent, this.#tripEventsListContainer);
  }

  #renderTripEventsBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.tripEvents.length === 0) {
      this.#renderNoTripEventsMessage();
      return;
    }

    this.#renderSortList();
    this.#renderTripEvents();
  }

  #renderSortList() {
    this.#sortComponent = new SortListView(this.#currentSortType, this.#handleSortTypeChange);
    render(this.#sortComponent, this.#tripEventsListContainer);
  }

  #renderTripEventsContainer() {
    render(this.#tripEventsListViewComponent, this.#tripEventsListContainer);
  }

  #renderTripEvents() {
    this.#renderTripEventsContainer();

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

  #handleAddEventDestroy = () => {
    this.#handleAddEventFormClose();

    if (this.tripEvents.length === 0) {
      remove(this.#sortComponent);
      this.#sortComponent = null;

      this.#renderNoTripEventsMessage();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripEventsBoard();
    this.#renderTripEventsBoard();
  };

  #handleStateChange = () => {
    if (this.#addEventPresenter) {
      this.#addEventPresenter.destroy();
    }

    this.#tripEventPresenters.forEach((presenter) => presenter.setDefaultState());
  };

  #clearTripEventsBoard(resetSort = false) {
    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    remove(this.#sortComponent);
    this.#sortComponent = null;

    if (this.#addEventPresenter) {
      this.#addEventPresenter.destroy();
    }

    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();

    if (resetSort) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
