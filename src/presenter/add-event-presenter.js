import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction } from '../constants.js';
import AddFormView from '../view/add-form-view.js';

export default class AddEventPresenter {
  #tripEventsContainer = null;
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

    this.#addEventComponent = new AddFormView(this.#allDestinations, this.#allOffers, this.#handleFormSubmit,
      this.#handleCancelClick);

    render(this.#addEventComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addEventComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addEventComponent);
    this.#addEventComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (tripEvent) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      { id: nanoid(), ...tripEvent }
    );

    this.destroy();
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
