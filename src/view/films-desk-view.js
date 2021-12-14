import AbstractView from './abstract-view';

const getFilmSectionTemplate = () => (
  `<section class="films">
    <!-- Main film section + Top rated + Top commented -->
  </section>`
);

class FilmsDeskView extends AbstractView {
  get template() {
    return getFilmSectionTemplate();
  }
}

export { FilmsDeskView as default };
