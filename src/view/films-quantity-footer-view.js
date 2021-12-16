import AbstractView from './abstract-view';

const getFilmFooterTemplate = (filmFilter) => {
  if (filmFilter?.total) {
    return `<p>${filmFilter.total} movies inside</p>`;
  }

  return '';
};

class FilmFooterView extends AbstractView {
  #filmFilter = {};
  constructor(filmFilter) {
    super();
    this.#filmFilter = filmFilter;
  }

  get template() {
    return getFilmFooterTemplate(this.#filmFilter);
  }
}

export { FilmFooterView as default };
