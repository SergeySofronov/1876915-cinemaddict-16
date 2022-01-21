import SmartView from './smart-view';
import { KeyCode, UserActions, EventStates } from '../const.js';

const ACTIVE_CLASS = 'film-details__control-button--active';
const emotionTypes = ['smile', 'sleeping', 'puke', 'angry'];

const TableTerms = {
  DIRECTOR: 'Director',
  WRITERS: 'Writers',
  ACTORS: 'Actors',
  DATE: 'Release Date',
  TIME: 'Runtime',
  COUNTRY: 'Country',
  GENRES: 'Genres'
};

const getCommentEmotionTemplate = (emotion, isChecked = false) => {
  if (emotionTypes.includes(emotion)) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isChecked ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`
    );
  }

  return '';
};


const getPopupNewCommentTemplate = (comment, userEmoji) => (
  `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <!--User Emoji-->
      ${userEmoji ? `<img src="images/emoji/${userEmoji}.png" width="55" height="55" alt="emoji-${userEmoji}">` : ''}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ''}</textarea>
    </label>

    <div class="film-details__emoji-list">
        ${emotionTypes.map((emotion) => getCommentEmotionTemplate(emotion, (emotion === userEmoji))).join('')}
    </div>
  </div>`);

const getLoadedCommentTemplate = (comment = {}) => {
  const {
    id = '',
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
          <button class="film-details__comment-delete" data-button-id = ${id}>Delete</button>
        </p>
      </div>
    </li>`
  );
};

const getPopupCommentSectionTemplate = (data) => {
  if (data) {
    return (
      `<div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data.changedComments ? data.changedComments.length : 0}</span></h3>

          <ul class="film-details__comments-list">
            <!-- Отрисовка всех комментариев к фильму -->
            ${data.changedComments.map((comment) => getLoadedCommentTemplate(comment)).join('')}
          </ul>

          ${getPopupNewCommentTemplate(data.userComment, data.userEmoji)}
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

const getPopupTemplate = (data) => {
  if (data) {
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
    } = data.filmInfo || {};

    const {
      watchlist = false,
      watched = false,
      favorite = false
    } = data;

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
          ${getPopupCommentSectionTemplate(data)}


        </form>
      </section>`
    );
  }

  return '';
};

class PopupView extends SmartView {
  #popupActionCallback = null;
  constructor(popupActionCallback) {
    super();

    if (!(popupActionCallback instanceof Function)) {
      throw new Error('Can\'t create PopupView instance updateFilmPresenter is not a Function');
    }

    this.#popupActionCallback = popupActionCallback;
  }

  get template() {
    return getPopupTemplate(this.data);
  }

  init = (filmData) => {
    this.data = SmartView.parseData(filmData);
    this.restoreHandlers();
  }

  restoreHandlers = () => {
    this.createEventListener('.film-details__close-btn', 'click', this.#onPopupButtonClose);
    this.createEventListener('.film-details__control-button--watchlist', 'click', this.#onWatchListButtonClick);
    this.createEventListener('.film-details__control-button--watched', 'click', this.#onWatchedButtonClick);
    this.createEventListener('.film-details__control-button--favorite', 'click', this.#onFavoriteButtonClick);
    this.createEventListener('.film-details__comment-input', 'change', this.#onUserCommentChange);
    this.createEventListener('.film-details__emoji-list', 'change', this.#onUserEmojiChange);
    this.createEventListener(document.body, 'keydown', this.#onEscKeyDown, EventStates.EVENT_DEFAULT);
    this.element.querySelectorAll('.film-details__bottom-container li button')
      .forEach((commentSelector) => this.createEventListener(commentSelector, 'click', this.#onCommentDelete));
  }

  #defaultPopupUpdate = (update, actionType = UserActions.UPDATE_POPUP) => {
    this.updateElement(update);
    this.#popupActionCallback(actionType, SmartView.restoreData(this.data));
  }

  #onUserEmojiChange = (evt) => {
    this.updateElement({ userEmoji: evt.target.value });
  }

  #onUserCommentChange = (evt) => {
    this.updateData({ userComment: evt.target.value });
  }

  #onCommentDelete = (evt) => {
    const buttonId = evt.target.dataset.buttonId;
    const index = this.data.changedComments.findIndex((comment) => comment.id === buttonId);
    this.data.changedComments.splice(index, 1);
    this.#defaultPopupUpdate({ changedComments: this.data.changedComments }, UserActions.UPDATE_COMMENT);
  }

  #onWatchListButtonClick = () => {
    this.#defaultPopupUpdate({ watchlist: !this.data.watchlist });
  }

  #onWatchedButtonClick = () => {
    this.#defaultPopupUpdate({ watched: !this.data.watched });
  }

  #onFavoriteButtonClick = () => {
    this.#defaultPopupUpdate({ favorite: !this.data.favorite });
  }

  #onPopupButtonClose = () => {
    this.#popupActionCallback(UserActions.REMOVE_POPUP, null);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === KeyCode.ESC) {
      this.#onPopupButtonClose();
    }

    if ((evt.key === KeyCode.ENTER) && (evt.ctrlKey || evt.metaKey)) {
      //document.querySelector('.film-details__inner').submit();
      console.log(evt.key, evt.ctrlKey);
    }
  };
}

export { PopupView as default };


