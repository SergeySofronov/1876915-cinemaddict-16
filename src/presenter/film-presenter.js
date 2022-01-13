import { render, replace, RenderPosition } from '../render.js';
import { PresenterMessages } from '../const.js';
import SmartView from '../view/smart-view.js';
import AbstractView from '../view/abstract-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';

class FilmPresenter {
  #filmsList = null;
  #filmData = null;
  #filmCard = null;
  #filmPopup = null;

  #updateFilmsData = null;
  #setActiveFilm = null;
  #getActiveFilm = null;

  constructor(filmsList, updateFilmsData, setActiveFilm, getActiveFilm) {
    if (!((filmsList instanceof AbstractView) || (filmsList instanceof Element))) {
      throw new Error('Can\'t create instance of FilmPresenter while filmsList is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof Function)) {
        throw new Error(`Can\\'t create instance of FilmPresenter while argument${i - 1} is not a Function`);
      }
    }

    this.#filmsList = filmsList;
    this.#updateFilmsData = updateFilmsData;
    this.#setActiveFilm = setActiveFilm;
    this.#getActiveFilm = getActiveFilm;
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

  #updateFilmPresenter = (message) => {
    switch (message) {
      case (PresenterMessages.REMOVE_POPUP):
        this.removePopup();
        this.#setActiveFilm(null);
        break;

      case (PresenterMessages.UPDATE_FILM):
        this.#updateFilmsData(SmartView.restoreData(this.#filmPopup.data));
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

  #isActiveFilm = () => (this.#getActiveFilm()?.id === this.id);

  #onWatchListClick = () => {
    this.#filmData.userDetails.watchlist = !this.#filmData.userDetails.watchlist;
    this.#updateFilmsData(this.#filmData);
  }

  #onWatchedClick = () => {
    this.#filmData.userDetails.watched = !this.#filmData.userDetails.watched;
    this.#updateFilmsData(this.#filmData);
  }

  #onFavoriteClick = () => {
    this.#filmData.userDetails.favorite = !this.#filmData.userDetails.favorite;
    this.#updateFilmsData(this.#filmData);
  }

  #onFilmCardClick = () => {
    if (this.#filmPopup || this.#isActiveFilm()) {
      return;
    }

    this.#setActiveFilm(this);
    this.#filmPopup = new PopupView(this.#updateFilmPresenter);
    this.#filmPopup.init(this.#filmData);
    render(document.body, this.#filmPopup, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
  }
}

export { FilmPresenter as default };
