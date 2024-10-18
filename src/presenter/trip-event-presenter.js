import { remove, render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../constants.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view.js';

const EventMode = {
  DEFAULT: 'default',
  EDITING: 'edit'
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
  #tripEventMode = EventMode.DEFAULT;

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
      this.#handleFormSubmit, this.#handleEditEventClick, this.#handleDeleteClick);

    if (prevEventViewComponent === null || prevEditFormViewComponent === null) {
      render(this.#eventViewComponent, this.#tripEventsListItemComponent.element);
      return;
    }

    if (this.#tripEventMode === EventMode.DEFAULT) {
      replace(this.#eventViewComponent, prevEventViewComponent);
    }

    if (this.#tripEventMode === EventMode.EDITING) {
      replace(this.#eventViewComponent, prevEditFormViewComponent);
      this.#tripEventMode = EventMode.DEFAULT;
    }

    remove(prevEventViewComponent);
    remove(prevEditFormViewComponent);
  }

  setDefaultState() {
    if (this.#tripEventMode !== EventMode.DEFAULT) {
      this.#editFormViewComponent.reset(this.#tripEvent);
      this.#replaceEditFormToEvent();
    }
  }

  setSaving() {
    if (this.#tripEventMode === EventMode.EDITING) {
      this.#editFormViewComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#tripEventMode === EventMode.EDITING) {
      this.#editFormViewComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#tripEventMode === EventMode.DEFAULT) {
      this.#eventViewComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormViewComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormViewComponent.shake(resetFormState);
  }

  destroy() {
    remove(this.#eventViewComponent);
    remove(this.#editFormViewComponent);
    remove(this.#tripEventsListItemComponent);
  }

  #replaceEventToEditForm() {
    this.#handerStateChange();
    replace(this.#editFormViewComponent, this.#eventViewComponent);
    this.#tripEventMode = EventMode.EDITING;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToEvent() {
    replace(this.#eventViewComponent, this.#editFormViewComponent);
    this.#tripEventMode = EventMode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editFormViewComponent.reset(this.#tripEvent);
      this.#replaceEditFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditEventClick = () => {
    if (this.#tripEventMode === EventMode.DEFAULT) {
      this.#replaceEventToEditForm();
    } else if (this.#tripEventMode === EventMode.EDITING) {
      this.#replaceEditFormToEvent();
    }
  };

  #handleFormSubmit = (tripEvent) => {
    this.#handleUpdateTripEvent(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      tripEvent
    );
  };

  #handleDeleteClick = (tripEvent) => {
    this.#handleUpdateTripEvent(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      tripEvent
    );
  };

  #handleFavoriteBtnClick = () => {
    this.#handleUpdateTripEvent(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite }
    );
  };
}
