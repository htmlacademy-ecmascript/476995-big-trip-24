
export default class OffersModel {
  #apiService = null;
  #offers = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#offers = [];

      throw new Error('Can\'t get offers');
    }
  }
}
