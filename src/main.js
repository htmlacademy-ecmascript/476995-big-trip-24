import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './constants.js';
import ApiService from './api-service.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import TripEventsModel from './model/trip-events-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import AddEventButtonView from './view/add-event-button-view.js';

const tripMainContainerEl = document.querySelector('.trip-main');

const filterModel = new FilterModel();
const tripEventsModel = new TripEventsModel(new ApiService(END_POINT, AUTHORIZATION));

const filterContainerEl = document.querySelector('.trip-controls__filters');
const filterPresenter = new FiltersPresenter(filterContainerEl, filterModel, tripEventsModel);

const tripBoardContainerEl = document.querySelector('.trip-events');
const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new ApiService(END_POINT, AUTHORIZATION));
const tripEventsPresenter =
  new TripEventsPresenter(tripBoardContainerEl, tripEventsModel, destinationsModel, offersModel, filterModel,
    handleAddEventFormClose);

const addEventButtonComponent = new AddEventButtonView(handleAddEventButtonClick);

function handleAddEventButtonClick() {
  tripEventsPresenter.addTripEvent();
  addEventButtonComponent.element.disabled = true;
}

function handleAddEventFormClose() {
  addEventButtonComponent.element.disabled = false;
}

filterPresenter.init();
tripEventsPresenter.init();

Promise.all([destinationsModel.init(), offersModel.init()])
  .then(() => tripEventsModel.init())
  .then(() => render(addEventButtonComponent, tripMainContainerEl))
  .catch(() => tripEventsPresenter.showError());
