
import AbstarctView from '../framework/view/abstract-view.js';
import { DATE_FORMAT } from '../constants.js';
import { formatDate } from '../utils/general.js';
import { sortByDate } from '../utils/sort.js';

const MAX_ROUTE_CITIES_AMOUNT = 3;

function getTripRoute(tripEvents, allDestinations) {
  const sortedTripEvents = [...tripEvents.sort(sortByDate)];
  const routeCities = sortedTripEvents.map(
    (tripEvent) => allDestinations.find((destination) => destination.id === tripEvent.destination)?.name
  );

  let routeText = '';
  if (routeCities.length > MAX_ROUTE_CITIES_AMOUNT) {
    routeText = `${routeCities[0]} &mdash; ... &mdash; ${routeCities[routeCities.length - 1]}`;
  } else {
    routeText = routeCities.join(' &mdash; ');
  }

  return routeText;
}

function getTripDates(tripEvents) {
  const sortedTripEvents = [...tripEvents.sort(sortByDate)];
  const dateStart = formatDate(sortedTripEvents[0]?.dateFrom, DATE_FORMAT.TRIP_INFO);
  const dateEnd = formatDate(sortedTripEvents[sortedTripEvents.length - 1]?.dateTo, DATE_FORMAT.TRIP_INFO);

  return `${dateStart} - ${dateEnd}`;
}

function getTripCost(tripEvents, allOffers) {
  return tripEvents.reduce((tripCost, tripEvent) => {
    const eventOffers = allOffers.find((offer) => offer.type === tripEvent.type).offers;

    const offersCost = tripEvent.offers.reduce((totalOfferCost, tripEventOffer) => {
      const price = eventOffers.find((eventOffer) => eventOffer.id === tripEventOffer)?.price || 0;

      return totalOfferCost + price;
    }, 0);

    return tripCost + tripEvent.basePrice + offersCost;
  }, 0);
}

function createTripInfoTemplate(tripEvents, allDestinations, allOffers) {
  const tripRoute = getTripRoute(tripEvents, allDestinations);
  const tripDates = getTripDates(tripEvents);
  const tripCost = getTripCost(tripEvents, allOffers);

  return `
      <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${tripRoute}</h1>

          <p class="trip-info__dates">${tripDates}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
        </p>
      </section>`;
}

export default class TripInfoView extends AbstarctView {
  #tripEvents = null;
  #allDestinations = null;
  #allOffers = null;

  constructor(tripEvents, allDestinations, allOffers) {
    super();

    this.#tripEvents = tripEvents;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
  }

  get template() {
    return createTripInfoTemplate(this.#tripEvents, this.#allDestinations, this.#allOffers);
  }
}
