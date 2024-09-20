import { render } from '../framework/render.js';
import SortListPresenter from './sort-list-presenter.js';
import TripEventsPresenter from './trip-events-presenter.js';
import ListEmptyView from '../view/list-empty-view.js';

export default class TripBoardPresenter {
  #tripBoardContainer = null;
  #sortingTypes = [];
  #tripEventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor(tripBoardContainer, sortingTypes, tripEventsModel, destinationsModel, offersModel) {
    this.#tripBoardContainer = tripBoardContainer;
    this.#sortingTypes = sortingTypes;
    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    if (this.#tripEventsModel.tripEvents.length > 0) {
      this.#initSortList();
      this.#initTripEvents();
    } else {
      render(new ListEmptyView(), this.#tripBoardContainer);
    }
  }

  #initSortList() {
    const sortListPresenter = new SortListPresenter(this.#tripBoardContainer, this.#sortingTypes);
    sortListPresenter.init();
  }

  #initTripEvents() {
    const tripEventsPresenter = new TripEventsPresenter(this.#tripBoardContainer, this.#tripEventsModel,
      this.#destinationsModel, this.#offersModel);
    tripEventsPresenter.init();
  }
}
