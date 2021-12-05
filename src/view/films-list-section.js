import { createElement } from '../render.js';

const getFilmListSectionTemplate = (titleText, isExtraSection = false) => (
  `<section class="films-list ${isExtraSection ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtraSection ? '' : 'visually-hidden'}">${titleText}</h2>
  </section>`
);

class FilmsListView {
  #titleText = '';
  #isExtraSection = false;
  #element = null;
  constructor(titleText, isExtraSection) {
    this.#titleText = titleText;
    this.#isExtraSection = isExtraSection;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(getFilmListSectionTemplate(this.#titleText, this.#isExtraSection));
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export { FilmsListView as default };
