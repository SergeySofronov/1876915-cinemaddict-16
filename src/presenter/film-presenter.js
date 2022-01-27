import { render, replace, RenderPosition } from '../render.js';
import { UserActions, FilterTypes } from '../const.js';
import SmartView from '../view/smart-view.js';
import AbstractView from '../view/abstract-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';

class FilmPresenter {
  #filmsList = null;
  #filmData = null;
  #filmCard = null;
  #filmPopup = null;

  #handleViewAction = null;
  #getActiveFilmId = null;

  constructor(filmsList, handleViewAction, getActiveFilmId) {
    if (!((filmsList instanceof AbstractView) || (filmsList instanceof Element))) {
      throw new Error('Can\'t create instance of FilmPresenter while filmsList is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof Function)) {
        throw new Error(`Can\\'t create instance of FilmPresenter while argument${i - 1} is not a Function`);
      }
    }

    this.#filmsList = filmsList;
    this.#handleViewAction = handleViewAction;
    this.#getActiveFilmId = getActiveFilmId;
  }

  get id() {
    return this.#filmData?.id;
  }

  get popup() {
    return this.#filmPopup;
  }

  init = (filmData) => {

    const prevFilmCard = this.#filmCard;

    this.#filmData = filmData;
    this.#filmCard = new FilmCardView(this.#filmData);

    this.#updateFilmHandlers();
    this.#updatePopup();

    if (prevFilmCard) {
      replace(prevFilmCard, this.#filmCard);
      prevFilmCard.removeElement();
    } else {
      render(this.#filmsList, this.#filmCard, RenderPosition.BEFOREEND);
    }
  }

  removeCard = () => {
    this.#filmCard.destroyElement();
  }

  removePopup = () => {
    this.#filmPopup?.destroyElement();
    this.#filmPopup = null;
    document.body.classList.remove('hide-overflow');
  }

  createPopup = (currentPopup) => {
    if (currentPopup) {
      this.#filmPopup = currentPopup;
      return;
    }

    this.#filmPopup = new PopupView(this.#handleViewAction);
    this.#filmPopup.init(this.#filmData);
    this.#handleViewAction(this, UserActions.UPDATE_ACTIVE);
    render(document.body, this.#filmPopup, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
  }

  #updatePopup = () => {
    if (this.#filmPopup) {
      this.#filmPopup.updateElement(SmartView.parseData(this.#filmData));
    }
  }

  #filmActionCallback = (actionDetails) => {
    this.#handleViewAction(this.#filmData, UserActions.UPDATE_DATA, actionDetails);
  }

  #updateFilmHandlers = () => {
    this.#filmCard.setFilmClickHandler(this.#onFilmCardClick);
    this.#filmCard.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmCard.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmCard.setFavoriteClickHandler(this.#onFavoriteClick);
  }

  #onWatchListClick = () => {
    this.#filmData.userDetails.watchlist = !this.#filmData.userDetails.watchlist;
    this.#filmActionCallback(FilterTypes.WATCHLIST);
  }

  #onWatchedClick = () => {
    this.#filmData.userDetails.watched = !this.#filmData.userDetails.watched;
    this.#filmActionCallback(FilterTypes.WATCHED);
  }

  #onFavoriteClick = () => {
    this.#filmData.userDetails.favorite = !this.#filmData.userDetails.favorite;
    this.#filmActionCallback(FilterTypes.FAVORITE);
  }

  #isActiveFilm = () => (this.#getActiveFilmId() === this.id);

  #onFilmCardClick = () => {
    if (this.#filmPopup || this.#isActiveFilm()) {
      return;
    }

    this.createPopup();
  }
}

export { FilmPresenter as default };
