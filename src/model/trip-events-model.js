
import Observable from '../framework/observable.js';
import { getRandomMockTripEvents } from '../mock/trip-events-mock.js';

const TRIP_EVENTS_AMOUNT = 5;

export default class TripEventsModel extends Observable {
  #tripEvents = getRandomMockTripEvents(TRIP_EVENTS_AMOUNT);

  get tripEvents() {
    return this.#tripEvents;
  }

  addEvent(updateType, eventToAdd) {
    this.#tripEvents = [...this.#tripEvents, eventToAdd];

    this._notify(updateType, eventToAdd);
  }

  updateEvent(updateType, eventToUpdate) {
    const index = this.#tripEvents.findIndex((event) => event.id === eventToUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      eventToUpdate,
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType, eventToUpdate);
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
}
