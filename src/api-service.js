import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export default class TripEventsApiService extends ApiService {
  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }

  get tripEvents() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  async addTripEvent(tripEvent) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse;
  }

  async updateTripEvent(tripEvent) {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(tripEvent)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse;
  }

  async deleteTripEvent(tripEvent) {
    const response = await this._load({
      url: `points/${tripEvent.id}`,
      method: Method.DELETE
    });

    return response;
  }

  #adaptToServer(tripEvent) {
    const adaptedTripEvent = {
      ...tripEvent,
      'base_price': tripEvent.basePrice,
      'date_from': tripEvent.dateFrom ? (new Date(tripEvent.dateFrom)).toISOString() : null,
      'date_to': tripEvent.dateTo ? (new Date(tripEvent.dateTo)).toISOString() : null,
      'is_favorite': tripEvent.isFavorite
    };

    delete adaptedTripEvent.basePrice;
    delete adaptedTripEvent.dateFrom;
    delete adaptedTripEvent.dateTo;
    delete adaptedTripEvent.isFavorite;

    return adaptedTripEvent;
  }
}
