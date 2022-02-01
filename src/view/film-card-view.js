import { getShortFilmDescription, changeDateFormat, getFilmDuration } from '../utils';
import { DateFormatStyle } from '../const';
import AbstractView from './abstract-view';

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

    const year = changeDateFormat(release?.date, DateFormatStyle.YEAR);
    const comments = filmData.commentsIds || [];

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
            <span class="film-card__duration">${getFilmDuration(runtime)}</span>
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
  #id = null;
  #filmData = {};
  constructor(filmData) {
    super();
    this.#filmData = filmData;
  }

  get id() {
    return this.#id;
  }

  get template() {
    return getFilmCardTemplate(this.#filmData);
  }

  setFilmClickHandler = (callback) => {
    this.createEventListener('.film-card__link', 'click', callback);
  }

  setWatchListClickHandler = (callback) => {
    this.createEventListener('.film-card__controls-item--add-to-watchlist', 'click', callback);
  }

  setWatchedClickHandler = (callback) => {
    this.createEventListener('.film-card__controls-item--mark-as-watched', 'click', callback);
  }

  setFavoriteClickHandler = (callback) => {
    this.createEventListener('.film-card__controls-item--favorite', 'click', callback);
  }
}

export { FilmCardView as default };
