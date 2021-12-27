import { render, replace, RenderPosition } from '../render.js';
import AbstractView from '../view/abstract-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';

class FilmPresenter {
  #filmsList = null;
  #filmData = null;
  #filmCard = null;
  #filmPopup = null;

  #updateFilmData = null;
  #onPopupButtonClose = null;
  #updateActivePopup = null;

  constructor(filmsList, updateFilmData, onPopupButtonClose, updateActivePopup) {
    if (!(filmsList instanceof AbstractView)) {
      throw new Error('Can\'t handle init() while filmsList is not an Element');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof Function)) {
        throw new Error(`Can\\'t handle init() while argument${i - 1} is not a Function`);
      }
    }

    this.#filmsList = filmsList;
    this.#updateFilmData = updateFilmData;
    this.#onPopupButtonClose = onPopupButtonClose;
    this.#updateActivePopup = updateActivePopup;
  }

  init = (filmData) => {

    const prevFilmCard = this.#filmCard;
    const scrollPosition = this.#getActivePopupScrollPosition();

    this.#filmData = filmData;
    this.#filmCard = new FilmCardView(this.#filmData);
    this.#filmPopup = new PopupView(this.#filmData);

    this.#updateFilmHandlers();

    if (prevFilmCard) {
      replace(prevFilmCard, this.#filmCard);
    } else {
      render(this.#filmsList, this.#filmCard, RenderPosition.BEFOREEND);
    }

    if (this.#isActivePopup()) {
      this.#updateActivePopup(this.#filmPopup, this.#updatePopupHandlers);
    }

    this.#filmPopup.element.scrollTop = scrollPosition;
  }

  #updateFilmHandlers = () => {
    this.#filmCard.setFilmClickHandler(this.#onFilmCardClick);
    this.#filmCard.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmCard.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmCard.setFavoriteClickHandler(this.#onFavoriteClick);
  }

  #updatePopupHandlers = () => {
    this.#filmPopup.setPopupCloseHandler(this.#onPopupButtonClose);
    this.#filmPopup.setCommentCloseHandlers(this.#onCommentButtonCloseClick);
    this.#filmPopup.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmPopup.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmPopup.setFavoriteClickHandler(this.#onFavoriteClick);
  }


  #getActivePopupScrollPosition = () => (this.#updateActivePopup()?.element.scrollTop || 0);
  #isActivePopup = () => (this.#updateActivePopup()?.id === this.#filmPopup.id);

  #onWatchListClick = () => {
    this.#filmData.userDetails.watchlist = !this.#filmData.userDetails.watchlist;
    this.#updateFilmData(this.#filmData);
  }

  #onWatchedClick = () => {
    this.#filmData.userDetails.watched = !this.#filmData.userDetails.watched;
    this.#updateFilmData(this.#filmData);
  }

  #onFavoriteClick = () => {
    this.#filmData.userDetails.favorite = !this.#filmData.userDetails.favorite;
    this.#updateFilmData(this.#filmData);
  }

  #onFilmCardClick = () => {
    if (!this.#isActivePopup()) {
      this.#updateActivePopup(this.#filmPopup, this.#updatePopupHandlers);
    }
  }

  #onCommentButtonCloseClick = (evt) => {
    evt.preventDefault();
    evt.target.closest('li').remove();
  };

}

export { FilmPresenter as default };
