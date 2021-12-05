import { createElement } from '../render';

const getFilmFooterTemplate = (filmFilter) => {
  if (filmFilter?.total) {
    return `<p>${filmFilter.total} movies inside</p>`;
  }

  return '';
};

class FilmFooterView {
  #filmFilter = {};
  #element = null;
  constructor(filmFilter) {
    this.#filmFilter = filmFilter;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(getFilmFooterTemplate(this.#filmFilter));
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { FilmFooterView as default };
