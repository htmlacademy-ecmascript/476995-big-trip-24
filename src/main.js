import FiltersPresenter from './presenter/filters-presenter.js';
import SortListPresenter from './presenter/sort-list-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const filterContainerEl = document.querySelector('.trip-controls__filters');
const filterPresenter = new FiltersPresenter(filterContainerEl);
filterPresenter.init();

const tripEventsContainerEl = document.querySelector('.trip-events');

const sortListPresenter = new SortListPresenter(tripEventsContainerEl);
sortListPresenter.init();

const tripEventsPresenter = new TripEventsPresenter(tripEventsContainerEl);
tripEventsPresenter.init();
