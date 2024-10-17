import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './constants.js';
import ApiService from './api-service.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import TripEventsModel from './model/trip-events-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import AddEventButtonView from './view/add-event-button-view.js';

const tripMainContainerEl = document.querySelector('.trip-main');
const tripBoardContainerEl = document.querySelector('.trip-events');
const filterContainerEl = document.querySelector('.trip-controls__filters');

const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new ApiService(END_POINT, AUTHORIZATION));
const tripEventsModel = new TripEventsModel(new ApiService(END_POINT, AUTHORIZATION));

const tripInfoPresenter = new TripInfoPresenter(tripMainContainerEl, tripEventsModel, destinationsModel, offersModel);
const addEventButtonComponent = new AddEventButtonView(handleAddEventButtonClick);
const filterPresenter = new FiltersPresenter(filterContainerEl, filterModel, tripEventsModel);
const tripEventsPresenter =
  new TripEventsPresenter(tripBoardContainerEl, tripEventsModel, destinationsModel, offersModel, filterModel,
    handleAddEventFormClose);

function handleAddEventButtonClick() {
  tripEventsPresenter.addTripEvent();
  addEventButtonComponent.element.disabled = true;
}

function handleAddEventFormClose() {
  addEventButtonComponent.element.disabled = false;
}

tripInfoPresenter.init();
render(addEventButtonComponent, tripMainContainerEl);
addEventButtonComponent.setDisabled();
filterPresenter.init();
tripEventsPresenter.init();

Promise.all([destinationsModel.init(), offersModel.init()])
  .then(() => tripEventsModel.init())
  .then(() => addEventButtonComponent.setEnabled())
  .catch(() => tripEventsPresenter.showError());
