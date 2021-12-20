import { render, replace, RenderPosition } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData } from '../filter.js';
import { SectionMessages, SortType } from '../const.js';
import { update } from '../mock/utils.js';

import AbstractView from '../view/abstract-view.js';
import FilmsDeskView from '../view/films-desk-view.js';
import FilmsSheetView from '../view/films-sheet-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILM_SHOW_PER_STEP = 5;
const FILM_EXTRA_QUANTITY = 2;

class FilmDeskPresenter {
  #parentContainer = null;
  #footerContainer = null;
  #filmsDesk = new FilmsDeskView();
  #filmEmptySheet = new FilmsSheetView(SectionMessages.NO_MOVIES);
  #filmsMainSheet = new FilmsSheetView(SectionMessages.DEFAULT, false, true);
  #filmsMainCardList = new FilmCardListView();
  #filmsRatedSheet = new FilmsSheetView(SectionMessages.RATED, true);
  #filmsRatedCardList = new FilmCardListView();
  #filmsPopularSheet = new FilmsSheetView(SectionMessages.POPULAR, true);
  #filmsPopularCardList = new FilmCardListView();
  #showMoreButton = new ShowMoreButtonView();

  #filmsPresenters = new Map();
  #activePopup = null;
  #filmsData = [];
  #filmsDataDefault = [];
  #filmsTopRated = [];
  #filmsTopCommented = [];

  #shownFilmQuantity = null;
  #totalFilmsQuantity = null;
  #restFilmQuantity = null;

  constructor(parentContainer, footerContainer) {
    this.#parentContainer = parentContainer;
    this.#footerContainer = footerContainer;
  }

  get currentPopup() {
    return this.#activePopup;
  }

  set currentPopup(element) {
    this.#activePopup = (element instanceof AbstractView) ? element : null;
  }

  init(filmsData) {
    this.#filmsData = [...filmsData];
    this.#filmsDataDefault = [...this.#filmsData];
    this.#totalFilmsQuantity = Math.max(this.#filmsData.length, FILM_SHOW_PER_STEP);

    //todo:delete filmsTopCommented и filmsTopRated
    this.#filmsTopRated = getTopRatedFilmsData(this.#filmsData).slice(0, FILM_EXTRA_QUANTITY);
    this.#filmsTopCommented = getTopCommentedFilmsData(this.#filmsData).slice(0, FILM_EXTRA_QUANTITY);


    render(this.#parentContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    this.#renderDesk();
  }

  updateFilmData = (film) => {
    if (film?.id) {
      this.#filmsData = update(this.#filmsData, film);
      this.#filmsDataDefault = update(this.#filmsDataDefault, film);
      for (const [presenter, filmId] of this.#filmsPresenters.entries()) {
        if (filmId === film.id) {
          presenter.init(film);
        }
      }
    }
  }

  #getFilmsToShowQuantity = () => {
    if (this.#totalFilmsQuantity > this.#shownFilmQuantity) {
      this.#restFilmQuantity = Math.min((this.#totalFilmsQuantity - this.#shownFilmQuantity), FILM_SHOW_PER_STEP);
    } else {
      this.#restFilmQuantity = 0;
    }

    return this.#restFilmQuantity;
  }

  #renderFilmCards(from, toward, filmsList) {
    this.#filmsData.slice(from, toward).forEach((film) => {
      if (film.id) {
        const filmPresenter = new FilmPresenter(filmsList, this.#footerContainer, this);
        filmPresenter.init(film);
        this.#filmsPresenters.set(filmPresenter, film.id);
      }
    });
  }

  #renderSheet = (sheet, list, quantity) => {
    render(this.#filmsDesk, sheet, RenderPosition.BEFOREEND);
    render(sheet, list, RenderPosition.BEFOREEND);
    this.#renderFilmCards(0, quantity, list);
  }

  #renderDesk() {
    if (this.#totalFilmsQuantity) {
      const currentQuantity = Math.min(this.#totalFilmsQuantity, FILM_SHOW_PER_STEP);
      this.#renderSheet(this.#filmsMainSheet, this.#filmsMainCardList, this.#getFilmsToShowQuantity());
      this.#shownFilmQuantity += currentQuantity;

      if (this.#filmsTopRated.length) {
        this.#renderSheet(this.#filmsRatedSheet, this.#filmsRatedCardList, FILM_EXTRA_QUANTITY);
      }

      if (this.#filmsTopCommented.length) {
        this.#renderSheet(this.#filmsPopularSheet, this.#filmsPopularCardList, FILM_EXTRA_QUANTITY);
      }

      if (this.#getFilmsToShowQuantity()) {
        this.#showMoreButton.setButtonClickHandler(this.#onShowMoreButtonClick);
        render(this.#filmsMainCardList, this.#showMoreButton, RenderPosition.AFTEREND);
      }
    } else {
      render(this.#filmsDesk, this.#filmEmptySheet, RenderPosition.BEFOREEND);
    }
  }

  #sortFilmsData(sortType) {
    switch (sortType) {
      case (SortType.DEFAULT):
        this.#filmsData = this.#filmsDataDefault;
        break;

      case (SortType.RATED):
        this.#filmsData = getTopRatedFilmsData(this.#filmsData);
        break;
      case (SortType.POPULAR):
        this.#filmsData = getTopCommentedFilmsData(this.#filmsData);
        break;
      default: break;
    }
  }

  #onShowMoreButtonClick = (evt) => {
    const rest = this.#getFilmsToShowQuantity();
    if (rest) {
      this.#renderFilmCards(this.#shownFilmQuantity, this.#shownFilmQuantity + rest, this.#filmsMainCardList);
      this.#shownFilmQuantity += rest;
    }

    if (!this.#getFilmsToShowQuantity()) {
      evt.target.remove();
    }
  };
}

export { FilmDeskPresenter as default };
