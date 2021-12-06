import { createElement } from '../render';

const getFilmSectionTemplate = () => (
  `<section class="films">
    <!-- Секция со списком фильмов -->
  </section>`
);

class FilmsAllView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(getFilmSectionTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { FilmsAllView as default };
