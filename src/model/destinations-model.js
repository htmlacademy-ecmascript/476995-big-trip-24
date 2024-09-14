
import { getMockDestinations } from '../mock/destinations-mock.js';

export default class DestinationsModel {
  #destinations = getMockDestinations();

  get destinations() {
    return this.#destinations;
  }
}
