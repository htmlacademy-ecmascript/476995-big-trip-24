
import { getMockDestinations } from '../mock/destinations-mock.js';

export default class DestinationsModel {
  destinations = getMockDestinations();

  getDestinations() {
    return this.destinations;
  }
}
