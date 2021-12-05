import { createElement } from '../render';

const getFilmSectionEmptyTemplate = (message = '') => (
  `<section class="films-list" >
    <h2 class="films-list__title">${message}</h2>
  </section >`
);

class FilmsEmptyView {
  #message = '';
  #element = null;
  constructor(message) {
    this.#message = message;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(getFilmSectionEmptyTemplate(this.#message));
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { FilmsEmptyView as default };
