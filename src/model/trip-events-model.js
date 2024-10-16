
import Observable from '../framework/observable.js';
import { UpdateType } from '../constants.js';

export default class TripEventsModel extends Observable {
  #apiService = null;
  #tripEvents = [];

  constructor(apiService) {
    super();

    this.#apiService = apiService;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  async init() {
    try {
      const tripEvents = await this.#apiService.tripEvents;
      this.#tripEvents = tripEvents.map(this.#adaptToClient);

      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#tripEvents = [];
      throw new Error('Can\'t get trip events');
    }
  }

  addEvent(updateType, eventToAdd) {
    this.#tripEvents = [...this.#tripEvents, eventToAdd];

    this._notify(updateType, eventToAdd);
  }

  async updateEvent(updateType, eventToUpdate) {
    const index = this.#tripEvents.findIndex((event) => event.id === eventToUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#apiService.updateTripEvent(eventToUpdate);
      const updatedEvent = this.#adaptToClient(response);
      this.#tripEvents = [
        ...this.#tripEvents.slice(0, index),
        updatedEvent,
        ...this.#tripEvents.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  deleteEvent(updateType, eventToDelete) {
    const index = this.#tripEvents.findIndex((event) => event.id === eventToDelete.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(tripEvent) {
    const adaptedTripEvent = {
      ...tripEvent,
      basePrice: tripEvent['base_price'],
      dateFrom: tripEvent['date_from'],
      dateTo: tripEvent['date_to'],
      isFavorite: tripEvent['is_favorite']
    };

    delete adaptedTripEvent['base_price'];
    delete adaptedTripEvent['date_from'];
    delete adaptedTripEvent['date_to'];
    delete adaptedTripEvent['is_favorite'];

    return adaptedTripEvent;
  }
}
