import { getShortFilmDescription, changeDateFormat } from '../mock/utils';
import AbstractView from './abstract-view';

const YEAR_FORMAT = 'YYYY';
const ACTIVE_CLASS = 'film-card__controls-item--active';

const getFilmCardTemplate = (filmData) => {
  if (filmData) {
    const {
      title = '',
      description = '',
      totalRating = 0,
      poster = '',
      genre = [],
      runtime = '',
      release = '',
    } = filmData.filmInfo || {};

    const year = changeDateFormat(release?.date, YEAR_FORMAT);
    const comments = filmData.comments || [];

    const {
      watchlist = false,
      watched = false,
      favorite = false
    } = filmData.userDetails || {};

    return (
      `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre.length ? genre[genre.length - 1] : ''}</span>
          </p>
          <img src="${poster}" alt="Изображение обложки фильма" class="film-card__poster">
          <p class="film-card__description">${getShortFilmDescription(description)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? ACTIVE_CLASS : ''}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watched ? ACTIVE_CLASS : ''}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? ACTIVE_CLASS : ''}" type="button">Mark as favorite</button>
        </div>
    </article>`
    );
  }

  return '';
};

class FilmCardView extends AbstractView {
  #filmData = {};
  constructor(filmData) {
    super();
    this.#filmData = filmData;
  }

  get template() {
    return getFilmCardTemplate(this.#filmData);
  }

  setFilmClickHandler(callback) {
    this.createEventListener('.film-card__link', 'click', callback);

    return this.element;
  }

  removeFilmClickHandler() {
    this.removeEventListener('.film-card__link');

    return this.element;
  }
}

export { FilmCardView as default };
