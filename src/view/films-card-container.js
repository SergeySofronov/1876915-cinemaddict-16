import { createElement } from '../render.js';

const getFilmCardsContainerTemplate = () => (
  `<div class="films-list__container">
        <!-- Карточки фильмов -->
  </div>`
);

class FilmCardListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(getFilmCardsContainerTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { FilmCardListView as default };
