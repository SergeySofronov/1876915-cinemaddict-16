import AbstractView from './abstract-view';

const getFilmListSectionTemplate = (titleText, isExtraSection = false) => (
  `<section class="films-list ${isExtraSection ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isExtraSection ? '' : 'visually-hidden'}">${titleText}</h2>
  </section>`
);

class FilmsListView extends AbstractView {
  #titleText = '';
  #isExtraSection = false;
  constructor(titleText, isExtraSection) {
    super();
    this.#titleText = titleText;
    this.#isExtraSection = isExtraSection;
  }

  get template() {
    return getFilmListSectionTemplate(this.#titleText, this.#isExtraSection);
  }
}

export { FilmsListView as default };
