import AbstractView from './abstract-view';

const getFooterProfileTemplate = (filmQuantity) => `<p>${filmQuantity ? filmQuantity : 0} movies inside</p>`;

class FilmQuantityView extends AbstractView {
  #filmQuantity = '';
  constructor(filmQuantity) {
    super();
    this.#filmQuantity = filmQuantity;
  }

  get template() {
    return getFooterProfileTemplate(this.#filmQuantity);
  }
}

export { FilmQuantityView as default };
