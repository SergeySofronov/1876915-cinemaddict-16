import { render, replace, RenderPosition } from '../render.js';
import { UserActions, UpdateTypes } from '../const.js';
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

    if (this.#filmPopup) {
      this.#filmPopup.updateElement(SmartView.parseData(this.#filmData));
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

  createPopup = () => {
    this.#handleViewAction(UserActions.UPDATE_ACTIVE, this);
    this.#filmPopup = new PopupView(this.#handleViewAction);
    this.#filmPopup.init(this.#filmData);
    render(document.body, this.#filmPopup, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
  }

  #updateFilmHandlers = () => {
    this.#filmCard.setFilmClickHandler(this.#onFilmCardClick);
    this.#filmCard.setWatchListClickHandler(this.#onWatchListClick);
    this.#filmCard.setWatchedClickHandler(this.#onWatchedClick);
    this.#filmCard.setFavoriteClickHandler(this.#onFavoriteClick);
  }

  #isActiveFilm = () => (this.#getActiveFilmId() === this.id);

  #onWatchListClick = () => {
    this.#filmData.userDetails.watchlist = !this.#filmData.userDetails.watchlist;
    this.#handleViewAction(UserActions.UPDATE_DATA, this.#filmData);
  }

  #onWatchedClick = () => {
    this.#filmData.userDetails.watched = !this.#filmData.userDetails.watched;
    this.#handleViewAction(UserActions.UPDATE_DATA, this.#filmData);
  }

  #onFavoriteClick = () => {
    this.#filmData.userDetails.favorite = !this.#filmData.userDetails.favorite;
    this.#handleViewAction(UserActions.UPDATE_DATA, this.#filmData);
  }

  #onFilmCardClick = () => {
    if (this.#filmPopup || this.#isActiveFilm()) {
      return;
    }

    this.createPopup();
  }
}

export { FilmPresenter as default };
