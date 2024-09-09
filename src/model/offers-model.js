
import { getMockOffers } from '../mock/offers-mock.js';

export default class OffersModel {
  offers = getMockOffers();

  getOffers() {
    return this.offers;
  }
}
