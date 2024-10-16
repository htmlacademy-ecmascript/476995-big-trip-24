export default class DestinationsModel {
  #apiService = null;
  #destinations = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch(err) {
      this.#destinations = [];

      throw new Error('Can\'t get destinations');
    }
  }
}
