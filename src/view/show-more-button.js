import { createElement } from '../render';

const getShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

class ShowMoreButtonView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(getShowMoreButtonTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { ShowMoreButtonView as default };
