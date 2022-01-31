import AbstractView from './abstract-view.js';

const getFilmListSectionTemplate = (isExtraSection) => (
  `<section class="films-list ${isExtraSection ? 'films-list--extra' : ''}">
  </section>`
);

class FilmsSheetView extends AbstractView {
  #isExtraSection = false;
  constructor(isExtraSection) {
    super();
    this.#isExtraSection = isExtraSection;
  }

  get template() {
    return getFilmListSectionTemplate(this.#isExtraSection);
  }
}

export { FilmsSheetView as default };
