import { remove, render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction } from '../constants.js';
import TripEventsListItemView from '../view/trip-events-list-item-view.js';
import AddFormView from '../view/add-form-view.js';

export default class AddEventPresenter {
  #tripEventsContainer = null;
  #tripEventsListItemComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #allDestinations = [];
  #allOffers = [];

  #addEventComponent = null;

  constructor(tripEventsContainer, allDestinations, allOffers, onDataChange, onDestroy) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addEventComponent !== null) {
      return;
    }

    if (this.#tripEventsListItemComponent === null) {
      this.#tripEventsListItemComponent = new TripEventsListItemView();
      render(this.#tripEventsListItemComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
    }

    this.#addEventComponent = new AddFormView(this.#allDestinations, this.#allOffers, this.#handleFormSubmit,
      this.#handleCancelClick);
    render(this.#addEventComponent, this.#tripEventsListItemComponent.element);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#addEventComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addEventComponent.updateElement({
        isDisabled: false,
        isSaving: false
      });
    };

    this.#addEventComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#addEventComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addEventComponent);
    this.#addEventComponent = null;

    remove(this.#tripEventsListItemComponent);
    this.#tripEventsListItemComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (tripEvent) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      tripEvent
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
