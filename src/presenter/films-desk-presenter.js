import { render, replace, RenderPosition } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData, getFilmsDataByDate } from '../filter.js';
import { SectionMessages, SortType } from '../const.js';
import { update } from '../mock/utils.js';

import SortMenuView from '../view/sort-menu-view.js';
import FilmsDeskView from '../view/films-desk-view.js';
import FilmsSheetView from '../view/films-sheet-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILM_SHOW_PER_STEP = 5;
const FILM_EXTRA_QUANTITY = 2;

class FilmDeskPresenter {
  #filmDeskRenderContainer = null;
  #filmSortMenu = new SortMenuView();
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
  #activeSortType = SortType.DEFAULT;

  #shownFilmQuantity = null;
  #totalFilmsQuantity = null;
  #restFilmQuantity = null;

  constructor(renderContainer) {
    this.#filmDeskRenderContainer = renderContainer;
  }

  init = (filmsData) => {
    this.#filmsData = [...filmsData];
    this.#filmsDataDefault = [...this.#filmsData];
    this.#totalFilmsQuantity = Math.max(this.#filmsData.length, FILM_SHOW_PER_STEP);
    this.#filmSortMenu.setSortClickHandler(this.#onSortMenuClick);
    render(this.#filmDeskRenderContainer, this.#filmSortMenu, RenderPosition.BEFOREEND);
    render(this.#filmDeskRenderContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    this.#renderDesk();
  }

  #removeActivePopup = () => {
    if (this.#activePopup) {
      this.#activePopup.removeElement();
      this.#activePopup = null;
    }
  }

  #updateActivePopup = (popup, callback) => {
    if (popup) {
      if (this.#activePopup) {
        replace(this.#activePopup, popup);
      } else if (callback) {
        callback();
      }
      this.#activePopup = popup;
    }

    return this.#activePopup;
  }

  #updateFilmData = (film) => {
    this.#filmsData = update(this.#filmsData, film);
    this.#filmsDataDefault = update(this.#filmsDataDefault, film);
    for (const [presenter, filmId] of this.#filmsPresenters.entries()) {
      if (filmId === film.id) {
        presenter.init(film);
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

  #renderFilmCards = (from, toward, filmsList) => {
    this.#filmsData.slice(from, toward).forEach((film) => {
      if (film.id) {
        const filmPresenter = new FilmPresenter(filmsList, this.#updateFilmData, this.#updateActivePopup, this.#removeActivePopup);
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

  #renderDesk = () => {
    if (this.#totalFilmsQuantity) {
      const currentQuantity = Math.min(this.#totalFilmsQuantity, FILM_SHOW_PER_STEP);
      this.#renderSheet(this.#filmsMainSheet, this.#filmsMainCardList, this.#getFilmsToShowQuantity());
      this.#shownFilmQuantity += currentQuantity;

      this.#sortFilmsData(SortType.RATE);
      if (this.#filmsData.length >= FILM_EXTRA_QUANTITY) {
        this.#renderSheet(this.#filmsRatedSheet, this.#filmsRatedCardList, FILM_EXTRA_QUANTITY);
      }

      this.#sortFilmsData(SortType.COMMENT);
      if (this.#filmsData.length >= FILM_EXTRA_QUANTITY) {
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

  #resetMainSheet = () => {
    const currentQuantity = Math.min(this.#totalFilmsQuantity, FILM_SHOW_PER_STEP);
    this.#filmsMainCardList.removeElement();
    render(this.#filmsMainSheet, this.#filmsMainCardList, RenderPosition.AFTERBEGIN);
    this.#renderFilmCards(0, currentQuantity, this.#filmsMainCardList);
    this.#shownFilmQuantity = currentQuantity;
  }

  #sortFilmsData = (sortType) => {
    switch (sortType) {
      case (SortType.RATE):
        this.#filmsData = getTopRatedFilmsData(this.#filmsDataDefault);
        break;

      case (SortType.DATE):
        this.#filmsData = getFilmsDataByDate(this.#filmsDataDefault);
        break;

      case (SortType.COMMENT):
        this.#filmsData = getTopCommentedFilmsData(this.#filmsDataDefault);
        break;

      default: case (SortType.DEFAULT):
        this.#filmsData = [...this.#filmsDataDefault];
        break;
    }

    this.#activeSortType = sortType;
  }

  #onSortMenuClick = (evt) => {
    if (evt.target.tagName === 'A') {
      const type = evt.target.dataset.sortType;
      if (this.#activeSortType !== type) {
        this.#sortFilmsData(type);
        this.#resetMainSheet();
      }
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
