import AbstractView from './abstract-view';

const getFilmFooterTemplate = (filmQuantity) => `<p>${filmQuantity ? filmQuantity : 0} movies inside</p>`;

class FilmFooterView extends AbstractView {
  #filmQuantity = '';
  constructor(filmQuantity) {
    super();
    this.#filmQuantity = filmQuantity;
  }

  get template() {
    return getFilmFooterTemplate(this.#filmQuantity);
  }
}

export { FilmFooterView as default };
