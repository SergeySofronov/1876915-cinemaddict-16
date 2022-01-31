import AbstractView from '../view/abstract-view.js';
import AbstractObservable from '../model/abstract-observable.js';
import FilmsQuantityFooterView from '../view/films-quantity-footer-view.js';
import { render, replace, RenderPosition } from '../render.js';


class FooterProfilePresenter {
  #filmsModel = null;
  #filmQuantity = null;
  #footerContainer = null;
  #footerComponent = null;

  constructor(footerContainer, filmsModel) {
    if (!((footerContainer instanceof AbstractView) || (footerContainer instanceof Element))) {
      throw new Error('Can\'t create instance of FooterProfilePresenter while footerContainer is not an Element or instance of AbstractView');
    }

    if (!(filmsModel instanceof AbstractObservable)) {
      throw new Error('Can\\\'t create instance of FooterProfilePresenter while filmsModel is not an instance of AbstractObservable');
    }

    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const filmQuantity = this.#getWatchedFilmsQuantity();
    if (this.#filmQuantity !== filmQuantity) {
      this.#filmQuantity = filmQuantity;
      const prevComponent = this.#footerComponent;
      this.#footerComponent = new FilmsQuantityFooterView(this.#filmQuantity);
      if (prevComponent) {
        replace(prevComponent, this.#footerComponent);
      } else {
        render(this.#footerContainer, this.#footerComponent, RenderPosition.BEFOREEND);
      }
    }
  }

  #getWatchedFilmsQuantity = () => this.#filmsModel.filmsData.length;

  #handleModelEvent = () => {
    this.init();
  }
}

export { FooterProfilePresenter as default };
