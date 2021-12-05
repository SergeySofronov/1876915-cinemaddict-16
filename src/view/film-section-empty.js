import AbstractView from './abstract-view';

const getFilmSectionEmptyTemplate = (message = '') => (
  `<section class="films-list" >
    <h2 class="films-list__title">${message}</h2>
  </section >`
);

class FilmsEmptyView extends AbstractView {
  #message = '';
  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return getFilmSectionEmptyTemplate(this.#message);
  }
}

export { FilmsEmptyView as default };
