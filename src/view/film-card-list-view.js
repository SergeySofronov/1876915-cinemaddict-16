import AbstractView from './abstract-view';

const getFilmCardsContainerTemplate = () => (
  `<div class="films-list__container">
        <!-- Карточки фильмов -->
  </div>`
);

class FilmCardListView extends AbstractView {
  get template() {
    return getFilmCardsContainerTemplate();
  }
}

export { FilmCardListView as default };
