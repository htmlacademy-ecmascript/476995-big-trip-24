import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatDate, capitalizeFirstLetter } from '../utils/general.js';
import { EventTypes, DateFormat } from '../constants.js';

const BLANK_EVENT = {
  dateFrom: null,
  dateTo: null,
  type: 'flight',
  destination: '',
  basePrice: 0,
  offers: [],
  isFavorite: false
};

function makeEventTypeListHtml(checkedType, isDisabled) {
  return EventTypes.map((eventType) =>
    `<div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${eventType}" ${eventType === checkedType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">
        ${capitalizeFirstLetter(eventType)}
      </label>
    </div>`
  ).join('');
}

function makeCitiesListHtml(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function makeDestinationHtml(city) {
  if (city?.description) {
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${city.description}</p>
              ${makePictures(city.pictures)}
            </section>`;
  }

  return '';
}

function makePictures(pictures) {
  if (pictures.length === 0) {
    return '';
  }

  const picturesListHtml = pictures
    .map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`)
    .join('');

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${picturesListHtml}
            </div>
          </div>`;
}

function makeOffersHtml(eventType, allOffers, selectedOffers, isDisabled) {
  const eventOffers = allOffers.find((offer) => offer.type === eventType)?.offers || [];
  if (eventOffers.length === 0) {
    return '';
  }

  const offersListHtml = eventOffers.map((offer) => {
    const isChecked = selectedOffers.includes(offer.id);

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox"
              name="event-offer-${offer.id}" ${isChecked ? 'checked' : ''} data-offer-id="${offer.id}" ${isDisabled ? 'disabled' : ''}>
              <label class="event__offer-label" for="event-offer-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  }).join('');

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersListHtml}
            </div>
          </section>`;
}

function createAddFormTemplate(event, allDestinations, allOffers) {
  const { dateFrom, dateTo, type, destination, basePrice, offers, isDisabled, isSaving } = event;

  const destinationData = allDestinations.find((dest) => dest.id === destination);
  const eventTypeListHtml = makeEventTypeListHtml(type, isDisabled);
  const citiesListHtml = makeCitiesListHtml(allDestinations);
  const eventTimeFrom = formatDate(dateFrom, DateFormat.INPUT_DATE);
  const eventTimeTo = formatDate(dateTo, DateFormat.INPUT_DATE);
  const destinationHtml = makeDestinationHtml(destinationData);
  const offersHtml = makeOffersHtml(type, allOffers, offers, isDisabled);

  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"
                  ${isDisabled ? 'disabled' : ''}>

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${eventTypeListHtml}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text"
                  name="event-destination" value="${he.encode(destinationData?.name || '')}" list="destination-list-1"
                  ${isDisabled ? 'disabled' : ''}>
                <datalist id="destination-list-1">
                  ${citiesListHtml}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                  value="${eventTimeFrom}" ${isDisabled ? 'disabled' : ''}>
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                  value="${eventTimeTo}" ${isDisabled ? 'disabled' : ''}>
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="0"
                   onkeyup="this.value = this.value.replace(/[^0-9]/g,'');"
                  value="${he.encode(basePrice.toString())}" ${isDisabled ? 'disabled' : ''}>
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
                ${isSaving ? 'Saving...' : 'Save'}
              </button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              ${offersHtml}
              ${destinationHtml}
            </section>
          </form>`;
}

export default class AddFormView extends AbstractStatefulView {
  #event = null;

  #allDestinations = [];
  #allOffers = [];

  #handleFormSubmit = null;
  #handleCancelClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(allDestinations, allOffers, onFormSubmit, onCancelClick) {
    super();

    this.#event = BLANK_EVENT;
    this._setState(AddFormView.parseTripEventToState(this.#event));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;

    this._restoreHandlers();
  }

  get template() {
    return createAddFormTemplate(this._state, this.#allDestinations, this.#allOffers);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeEventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.#setDatepicker();
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
    const offerSelectorEl = this.element.querySelector('.event__available-offers');
    if (offerSelectorEl) {
      offerSelectorEl.addEventListener('change', this.#changeOffersHandler);
    }
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset() {
    this.updateElement(BLANK_EVENT);
  }

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormat.DATEPICKER_DATE,
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormat.DATEPICKER_DATE,
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler
      }
    );
  }

  #changeEventTypeHandler = (evt) => {
    evt.preventDefault();

    const newType = evt.target.value;
    this.updateElement({ type: newType, offers: [] });
  };

  #changeDestinationHandler = (evt) => {
    const newDestinationName = evt.target.value;
    const destinationId = this.#allDestinations.find((destination) => destination.name === newDestinationName)?.id;

    this.updateElement({ destination: destinationId });
  };

  #dateFromChangeHandler = ([dateFrom]) => {
    if (dayjs(this._state.dateTo).diff(dateFrom, 'minutes') < 0) {
      this.updateElement({ dateFrom, dateTo: dateFrom });
    } else {
      this.updateElement({ dateFrom });
    }
  };

  #dateToChangeHandler = ([dateTo]) => {
    this.updateElement({ dateTo });
  };

  #changePriceHandler = (evt) => {
    const newPrice = +evt.target.value;

    this._setState({ basePrice: newPrice });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#handleFormSubmit(AddFormView.parseStateToTripEvent(this._state));
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleCancelClick();
  };

  #changeOffersHandler = (evt) => {
    evt.preventDefault();

    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    let currentOffers = this._state.offers;

    if (evt.target.checked) {
      currentOffers.push(evt.target.dataset.offerId);
    } else {
      currentOffers = currentOffers.filter((offerId) => offerId !== evt.target.dataset.offerId);
    }

    this._setState({ offers: currentOffers });
  };

  static parseTripEventToState(tripEvent) {
    return {
      ...tripEvent,
      isDisabled: false,
      isSaving: false,
    };
  }

  static parseStateToTripEvent(state) {
    const tripEvent = { ...state };

    delete tripEvent.isDisabled;
    delete tripEvent.isSaving;

    return tripEvent;
  }
}
