import { render, replace, RenderPosition } from '../render.js';
import { PresenterMessages, UpdateStates } from '../const.js';
import SmartView from '../view/smart-view.js';
import AbstractView from '../view/abstract-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';

class FilmPresenter {
  #filmsList = null;
  #filmData = null;
  #filmCard = null;
  #filmPopup = null;

  #updateFilmData = null;
  #updateActivePopup = null;
  #getActivePopup = null;

  constructor(filmsList, updateFilmData, updateActivePopup, getActivePopup) {
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
    this.#updateActivePopup = updateActivePopup;
    this.#getActivePopup = getActivePopup;
  }

  init = (filmData) => {

    const prevFilmCard = this.#filmCard;

    this.#filmData = filmData;
    this.#filmCard = new FilmCardView(this.#filmData);
    this.#updateFilmHandlers();

    if (prevFilmCard) {
      replace(prevFilmCard, this.#filmCard);
    } else {
      render(this.#filmsList, this.#filmCard, RenderPosition.BEFOREEND);
    }

    if (this.#isActivePopup()) {
      const popupData = SmartView.parseData(this.#filmData);
      this.#filmPopup.updateData(popupData, UpdateStates.WITH_POPUP_UPDATE, UpdateStates.WITHOUT_FILM_UPDATE);
    }
  }

  #updateFilmPresenter = (message) => {
    switch (message) {
      case (PresenterMessages.DELETE_POPUP_UPDATE):
        this.#updateActivePopup(null);
        this.#filmPopup = null;
        break;

      case (PresenterMessages.DELETE_POPUP):
        this.#filmPopup = null;
        break;

      case (PresenterMessages.UPDATE_FILM):
        this.#updateFilmData(SmartView.restoreData(this.#filmPopup.data));
        break;

      default: break;
    }
  }

  #updateFilmHandlers = () => {
    this.#filmCard.setFilmClickHandler(this.#onFilmCardClick);
    this.#filmCard.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmCard.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmCard.setFavoriteClickHandler(this.#onFavoriteClick);
  }

  #isActivePopup = () => ((this.#filmPopup) && (this.#getActivePopup()?.id === this.#filmPopup.id));

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
    if (!this.#filmPopup) {
      this.#filmPopup = new PopupView(this.#filmData, this.#updateFilmPresenter);
    }

    if (!this.#isActivePopup()) {
      this.#updateActivePopup(this.#filmPopup);
      this.#filmPopup.restoreHandlers(UpdateStates.WITHOUT_POPUP_UPDATE);
    }
  }
}

export { FilmPresenter as default };
