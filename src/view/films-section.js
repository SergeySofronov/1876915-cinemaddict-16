import AbstractView from './abstract-view';

const getFilmSectionTemplate = () => (
  `<section class="films">
    <!-- Секция со списком фильмов -->
  </section>`
);

class FilmsAllView extends AbstractView {
  get template() {
    return getFilmSectionTemplate();
  }
}

export { FilmsAllView as default };
