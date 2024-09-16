
import { getMockOffers } from '../mock/offers-mock.js';

export default class OffersModel {
  #offers = getMockOffers();

  get offers() {
    return this.#offers;
  }
}
