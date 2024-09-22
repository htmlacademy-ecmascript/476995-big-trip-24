import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { formatDate, capitalizeFirstLetter } from '../utils/general.js';
import { EVENT_TYPES, DATE_FORMAT } from '../constants.js';

const BLANK_EVENT = {
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: 'taxi',
  destinationData: {
    name: '',
    description: ''
  },
  basePrice: 0,
  selectedOffers: []
};

function makeEventTypeListHtml(checkedType) {
  return EVENT_TYPES.map((eventType) =>
    `<div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${eventType}" ${eventType === checkedType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">
        ${capitalizeFirstLetter(eventType)}
      </label>
    </div>`
  ).join('');
}

function makeCitiesListHtml(citiesList) {
  return citiesList.map((cityName) => `<option value="${cityName}"></option>`).join('');
}

function makeDestinationHtml(city) {
  if (city?.description) {
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${city.description}</p>
            </section>`;
  }

  return '';
}

function makeOffersHtml(offers, selectedOffers) {
  if (offers.length === 0) {
    return '';
  }

  const selectedOfferIds = selectedOffers.map((selectedOffer) => selectedOffer.id);

  const offersListHtml = offers.map((offer) => {
    const isChecked = selectedOfferIds.includes(offer.id);

    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked ? 'checked' : ''}>
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

function createAddFormTemplate(event, citiesList, allOffers) {
  const { dateFrom, dateTo, type, destinationData, basePrice, selectedOffers } = event;

  const eventTypeListHtml = makeEventTypeListHtml(type);
  const citiesListHtml = makeCitiesListHtml(citiesList);
  const eventTimeFrom = formatDate(dateFrom, DATE_FORMAT.INPUT_DATE);
  const eventTimeTo = formatDate(dateTo, DATE_FORMAT.INPUT_DATE);
  const destinationHtml = makeDestinationHtml(destinationData);
  const eventOffers = allOffers.find((offer) => offer.type === type).offers;
  const offersHtml = makeOffersHtml(eventOffers, selectedOffers);

  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationData.name}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${citiesListHtml}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventTimeFrom}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventTimeTo}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              ${offersHtml}
              ${destinationHtml}
            </section>
          </form>`;
}

export default class AddFormView extends AbstractView {
  #citiesList = [];
  #allOffers = [];

  constructor(citiesList, offers) {
    super();

    this.#citiesList = citiesList;
    this.#allOffers = offers;
  }

  get template() {
    return createAddFormTemplate(BLANK_EVENT, this.#citiesList, this.#allOffers);
  }
}
