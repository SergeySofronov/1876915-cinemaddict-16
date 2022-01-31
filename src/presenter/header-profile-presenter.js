
import AbstractView from '../view/abstract-view.js';
import AbstractObservable from '../model/abstract-observable.js';
import UserProfileView from '../view/user-profile-view.js';
import { render, replace, RenderPosition } from '../render.js';
import { getUserRank, filterFunctions } from '../filter.js';
import { FilterTypes } from '../const.js';

class HeaderProfilePresenter {
  #filmsModel = null;
  #headerContainer = null;
  #headerComponent = null;
  #userRank = null;

  constructor(headerContainer, filmsModel) {
    if (!((headerContainer instanceof AbstractView) || (headerContainer instanceof Element))) {
      throw new Error('Can\'t create instance of HeaderProfilePresenter while headerContainer is not an Element or instance of AbstractView');
    }

    if (!(filmsModel instanceof AbstractObservable)) {
      throw new Error('Can\\\'t create instance of HeaderProfilePresenter while filmsModel is not an instance of AbstractObservable');
    }

    this.#headerContainer = headerContainer;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const newRank = getUserRank(this.#getWatchedFilmsQuantity());
    if (this.#userRank !== newRank) {
      this.#userRank = newRank;
      const prevComponent = this.#headerComponent;
      this.#headerComponent = new UserProfileView(this.#userRank);
      if (prevComponent) {
        replace(prevComponent, this.#headerComponent);
      } else {
        render(this.#headerContainer, this.#headerComponent, RenderPosition.BEFOREEND);
      }
    }
  }

  #getWatchedFilmsQuantity = () => filterFunctions[FilterTypes.WATCHED](this.#filmsModel.filmsData).length;

  #handleModelEvent = () => {
    this.init();
  }
}

export { HeaderProfilePresenter as default };
