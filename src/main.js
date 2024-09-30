import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import TripEventsModel from './model/trip-events-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { generateFilter } from './mock/filter.js';

const tripEventsModel = new TripEventsModel();

const filters = generateFilter(tripEventsModel.tripEvents);
const filterContainerEl = document.querySelector('.trip-controls__filters');
const filterPresenter = new FiltersPresenter(filterContainerEl, filters);
filterPresenter.init();

const tripBoardContainerEl = document.querySelector('.trip-events');
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const tripEventPresenter =
  new TripEventsPresenter (tripBoardContainerEl, tripEventsModel, destinationsModel, offersModel);
tripEventPresenter.init();
