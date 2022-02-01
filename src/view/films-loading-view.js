import AbstractView from './abstract-view.js';

const getFilmLoadingTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`
);

class FilmsLoadingView extends AbstractView {

  get template() {
    return getFilmLoadingTemplate();
  }
}

export { FilmsLoadingView as default };
