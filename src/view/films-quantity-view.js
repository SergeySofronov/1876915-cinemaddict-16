import AbstractView from './abstract-view';

const getFilmQuantityTemplate = (filmQuantity) => `<p>${filmQuantity ? filmQuantity : 0} movies inside</p>`;

class FilmQuantityView extends AbstractView {
  #filmQuantity = '';
  constructor(filmQuantity) {
    super();
    this.#filmQuantity = filmQuantity;
  }

  get template() {
    return getFilmQuantityTemplate(this.#filmQuantity);
  }
}

export { FilmQuantityView as default };
