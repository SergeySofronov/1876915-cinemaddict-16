import AbstractView from './abstract-view';

const getFilmListSectionTemplate = (titleText, isExtraSection = false, isHidden = false) => (
  `<section class="films-list ${isExtraSection ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${titleText}</h2>
  </section>`
);

class FilmsSheetView extends AbstractView {
  #titleText = '';
  #isExtraSection = false;
  #isHidden = false;
  constructor(titleText, isExtraSection, isHidden) {
    super();
    this.#titleText = titleText;
    this.#isExtraSection = isExtraSection;
    this.#isHidden = isHidden;
  }

  get template() {
    return getFilmListSectionTemplate(this.#titleText, this.#isExtraSection, this.#isHidden);
  }
}

export { FilmsSheetView as default };
