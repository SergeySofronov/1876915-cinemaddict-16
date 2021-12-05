import { createElement } from '../render';

const getFilmSortMenuTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

class SortMenuView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(getFilmSortMenuTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { SortMenuView as default };
