import { remove, render, replace } from '../framework/render.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';

const EVENT_STATE = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

export default class TripEventPresenter {
  #tripEventsListContainer = null;
  #handleUpdateTripEvent = null;
  #handerStateChange = null;

  #allDestinations = [];
  #allOffers = [];

  #tripEventsListItemComponent = null;
  #eventViewComponent = null;
  #editFormViewComponent = null;

  #tripEvent = null;
  #tripEventState = EVENT_STATE.DEFAULT;

  constructor(tripEventsListContainer, allDestinations, allOffers, onUpdateTripEvent, onStateChange) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleUpdateTripEvent = onUpdateTripEvent;
    this.#handerStateChange = onStateChange;
  }

  init(tripEvent) {
    this.#tripEvent = tripEvent;

    if (this.#tripEventsListItemComponent === null) {
      this.#tripEventsListItemComponent = new TripEventsListItemView();
      render(this.#tripEventsListItemComponent, this.#tripEventsListContainer);
    }

    const prevEventViewComponent = this.#eventViewComponent;
    const prevEditFormViewComponent = this.#editFormViewComponent;

    this.#eventViewComponent = new EventView(this.#tripEvent, this.#allDestinations, this.#allOffers,
      this.#handleEditEventClick, this.#handleFavoriteBtnClick);
    this.#editFormViewComponent = new EditFormView(this.#tripEvent, this.#allDestinations, this.#allOffers,
      this.#handleFormSubmit, this.#handleEditEventClick);

    if (prevEventViewComponent === null || prevEditFormViewComponent === null) {
      render(this.#eventViewComponent, this.#tripEventsListItemComponent.element);
      return;
    }

    if (this.#tripEventsListItemComponent.element.contains(prevEventViewComponent.element)) {
      replace(this.#eventViewComponent, prevEventViewComponent);
    }

    if (this.#tripEventsListItemComponent.element.contains(prevEditFormViewComponent.element)) {
      replace(this.#editFormViewComponent, prevEditFormViewComponent);
    }

    remove(prevEventViewComponent);
    remove(prevEditFormViewComponent);
  }

  setDefaultState() {
    if (this.#tripEventState !== EVENT_STATE.DEFAULT) {
      this.#replaceEditFormToEvent();
    }
  }

  destroy() {
    remove(this.#eventViewComponent);
    remove(this.#editFormViewComponent);
    remove(this.#tripEventsListItemComponent);
  }

  #replaceEventToEditForm() {
    this.#handerStateChange();
    replace(this.#editFormViewComponent, this.#eventViewComponent);
    this.#tripEventState = EVENT_STATE.EDIT;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToEvent() {
    replace(this.#eventViewComponent, this.#editFormViewComponent);
    this.#tripEventState = EVENT_STATE.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditEventClick = () => {
    if (this.#tripEventState === EVENT_STATE.DEFAULT) {
      this.#replaceEventToEditForm();
    } else if (this.#tripEventState === EVENT_STATE.EDIT) {
      this.#replaceEditFormToEvent();
    }
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToEvent();
  };

  #handleFavoriteBtnClick = () => {
    this.#handleUpdateTripEvent({ ...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite });
  };
}
