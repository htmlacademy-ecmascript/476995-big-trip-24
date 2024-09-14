
import { getRandomMockTripEvents } from '../mock/trip-events-mock.js';

const TRIP_EVENTS_AMOUNT = 3;

export default class TripEventsModel {
  #tripEvents = getRandomMockTripEvents(TRIP_EVENTS_AMOUNT);

  get tripEvents() {
    return this.#tripEvents;
  }
}
