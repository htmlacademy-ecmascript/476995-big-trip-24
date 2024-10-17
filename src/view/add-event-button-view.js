import AbstarctView from '../framework/view/abstract-view';

function createAddEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class AddEventButtonView extends AbstarctView {
  #handleClick = null;

  constructor(onClick) {
    super();

    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createAddEventButtonTemplate();
  }

  setEnabled() {
    this.element.disabled = false;
  }

  setDisabled() {
    this.element.disabled = true;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    this.#handleClick();
  };
}
