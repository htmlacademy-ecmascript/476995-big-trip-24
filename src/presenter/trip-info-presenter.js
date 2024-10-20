import { remove, render, RenderPosition, replace } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;

  #tripEventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripInfoComponent = null;

  constructor(tripInfoContainer, tripEventsModel, destinationsModel, offersModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(this.#tripEventsModel.tripEvents, this.#destinationsModel.destinations,
      this.#offersModel.offers
    );

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
