import AbstractView from './abstract-view';
import { getCommentEmotionTypes } from '../mock/data';

const ACTIVE_CLASS = 'film-details__control-button--active';

const TableTerms = {
  DIRECTOR: 'Director',
  WRITERS: 'Writers',
  ACTORS: 'Actors',
  DATE: 'Release Date',
  TIME: 'Runtime',
  COUNTRY: 'Country',
  GENRES: 'Genres'
};

const emotionTypes = (Array.isArray(getCommentEmotionTypes()) && getCommentEmotionTypes()) || [];

const getCommentEmotionTemplate = (emotion) => {
  if (emotionTypes.includes(emotion)) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`
    );
  }

  return '';
};

const getPopupNewCommentTemplate = () => (
  `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
        ${emotionTypes.map((emotion) => getCommentEmotionTemplate(emotion)).join('')}
    </div>
  </div>`);

const getLoadedCommentTemplate = (comment = {}) => {
  const {
    author = '',
    emotion = '',
    content = '',
    date = '',
  } = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${content}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const getPopupCommentSectionTemplate = (filmData) => {
  if (filmData) {
    return (
      `<div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmData.comments ? filmData.comments.length : 0}</span></h3>

          <ul class="film-details__comments-list">
            <!-- Отрисовка всех комментариев к фильму -->
            ${filmData.comments?.map((comment) => getLoadedCommentTemplate(comment)).join('')}
          </ul>

          ${getPopupNewCommentTemplate()}
        </section>
      </div>`
    );
  }

  return '';
};

const getTableRow = (term, ceilData) => (
  `<tr class="film-details__row">
  <td class="film-details__term">${term || ''}</td>
  <td class="film-details__cell">${ceilData || ''}</td>
</tr>`
);

const getCardGenres = (genres) => {
  const genreTemplates = [];
  if (Array.isArray(genres)) {
    genres.forEach((genre) => {
      genreTemplates.push(`<span class="film-details__genre">${genre}</span>`);
    });
  }

  return genreTemplates.join(' ');
};

const getPopupTemplate = (filmData) => {
  if (filmData) {
    const {
      title = '',
      alternativeTitle = '',
      description = '',
      totalRating = 0,
      poster = '',
      genre = [],
      runtime = '',
      release = {},
      pegi = '',
      director = '',
      writers = [],
      actors = [],
    } = filmData.filmInfo || {};

    const {
      watchlist = false,
      watched = false,
      favorite = false
    } = filmData.userDetails || {};

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="Изображение постера фильма">
                <p class="film-details__age">+${pegi}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                ${getTableRow(TableTerms.DIRECTOR, director)}
                ${getTableRow(TableTerms.WRITERS, writers)}
                ${getTableRow(TableTerms.ACTORS, actors)}
                ${getTableRow(TableTerms.DATE, release.date || '')}
                ${getTableRow(TableTerms.TIME, runtime)}
                ${getTableRow(TableTerms.COUNTRY, release.country || '')}
                ${getTableRow(TableTerms.GENRES, getCardGenres(genre))}
                </table>

                <p class="film-details__film-description">
                  ${description}
              </div>
            </div>

            <section class="film-details__controls">
              <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist ? ACTIVE_CLASS : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
              <button type="button" class="film-details__control-button film-details__control-button--watched ${watched ? ACTIVE_CLASS : ''}" id="watched" name="watched">Already watched</button>
              <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite ? ACTIVE_CLASS : ''}" id="favorite" name="favorite">Add to favorites</button>
            </section>
          </div>

          <!-- Секция комментариев -->
          ${getPopupCommentSectionTemplate(filmData)}


        </form>
      </section>`
    );
  }

  return '';
};

class PopupView extends AbstractView {
  #filmData = {};
  constructor(filmData) {
    super();
    this.#filmData = filmData;
  }

  get template() {
    return getPopupTemplate(this.#filmData);
  }

  setPopupCloseHandler(callback) {
    this.createEventListener('.film-details__close-btn', 'click', callback);

    return this.element;
  }

  setCommentCloseHandlers(callback) {
    this.element.querySelectorAll('.film-details__bottom-container li button')
      .forEach((commentSelector) => this.createEventListener(commentSelector, 'click', callback));
  }

  removePopupCloseHandler() {
    this.removeEventListener('.film-details__close-btn');

    return this.element;
  }

  removeCommentCloseHandlers() {
    this.element.querySelectorAll('.film-details__bottom-container li button')
      .forEach((commentSelector) => this.removeEventListener(commentSelector));
  }

}

export { PopupView as default };


