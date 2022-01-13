import { render, RenderPosition } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData, getFilmsDataByDate } from '../filter.js';
import { SectionMessages, SortType } from '../const.js';
import { update } from '../mock/utils.js';

import AbstractObservable from '../model/abstract-observable.js';
import AbstractView from '../view/abstract-view.js';
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

  #filmsModel = null;
  #filmsPresenters = new Map();

  #activeFilm = null;

  #filmsData = [];
  #filmsDataDefault = [];
  #activeSortType = SortType.DEFAULT;

  #shownFilmQuantity = null;
  #totalFilmsQuantity = null;
  #extraFilmsQuantity = null;
  #restFilmQuantity = null;

  constructor(renderContainer, filmsModel) {
    if (!((renderContainer instanceof AbstractView) || (renderContainer instanceof Element))) {
      throw new Error('Can\'t create instance of FilmDeskPresenter while renderContainer is not an Element or instance of AbstractView');
    }

    if (!(filmsModel instanceof AbstractObservable)) {
      throw new Error('Can\'t create instance of FilmDeskPresenter while filmsModel is not an instance of AbstractObservable');
    }

    this.#filmDeskRenderContainer = renderContainer;
    this.#filmsModel = filmsModel;
  }

  //todo: перевести весь презентер на getter(module 7.1)
  get filmsData() {
    return this.#filmsModel.filmsData;
  }

  init = (filmsData) => {
    this.#filmsData = [...filmsData];
    this.#filmsDataDefault = [...this.#filmsData];
    this.#totalFilmsQuantity = this.#filmsData.length;
    this.#extraFilmsQuantity = (this.#filmsData.length > FILM_EXTRA_QUANTITY) ? FILM_EXTRA_QUANTITY : 0;
    this.#filmSortMenu.setSortClickHandler(this.#onSortMenuClick);

    render(this.#filmDeskRenderContainer, this.#filmSortMenu, RenderPosition.BEFOREEND);
    render(this.#filmDeskRenderContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    this.#renderDeskSheets();
  }

  #getActiveFilm = () => this.#activeFilm;

  #setActiveFilm = (film) => {
    if (film) {
      this.#activeFilm?.removePopup();
    }
    this.#activeFilm = film;
  }

  #updateFilmsData = (film) => {
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
        const filmPresenter = new FilmPresenter(filmsList, this.#updateFilmsData, this.#setActiveFilm, this.#getActiveFilm);
        filmPresenter.init(film);
        this.#filmsPresenters.set(filmPresenter, film.id);
      }
    });
  }

  #renderSheet = (sheet, list, sortType, quantity) => {
    this.#sortFilmsData(sortType);
    render(this.#filmsDesk, sheet, RenderPosition.AFTERBEGIN);
    render(sheet, list, RenderPosition.BEFOREEND);
    this.#renderFilmCards(0, quantity, list);
  }

  #renderDeskSheets = (sortType) => {
    if (this.#totalFilmsQuantity) {

      if (this.#extraFilmsQuantity) {
        this.#renderSheet(this.#filmsPopularSheet, this.#filmsPopularCardList, SortType.COMMENT, this.#extraFilmsQuantity);
        this.#renderSheet(this.#filmsRatedSheet, this.#filmsRatedCardList, SortType.RATE, this.#extraFilmsQuantity);
      }

      this.#renderSheet(this.#filmsMainSheet, this.#filmsMainCardList, sortType, this.#getFilmsToShowQuantity());
      this.#shownFilmQuantity += Math.min(this.#totalFilmsQuantity, FILM_SHOW_PER_STEP);

      if (this.#getFilmsToShowQuantity()) {
        this.#showMoreButton.setButtonClickHandler(this.#onShowMoreButtonClick);
        render(this.#filmsMainCardList, this.#showMoreButton, RenderPosition.AFTEREND);
      }

      return;
    }

    render(this.#filmsDesk, this.#filmEmptySheet, RenderPosition.BEFOREEND);
  }

  #resetDesk = () => {
    //todo: возможно придется закрывать/обновлять оставшийся popup, при обновлении данных с сервера
    for (const [presenter,] of this.#filmsPresenters.entries()) {
      presenter.removeCard();
    }
    this.#filmsPresenters.clear();
    this.#shownFilmQuantity = 0;
    this.#filmsMainCardList.destroyElement();
    this.#filmsRatedCardList.destroyElement();
    this.#filmsPopularCardList.destroyElement();
    this.#showMoreButton.destroyElement();
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
        this.#resetDesk();
        this.#renderDeskSheets(type);
      }
    }
  }

  #onShowMoreButtonClick = () => {
    const rest = this.#getFilmsToShowQuantity();
    if (rest) {
      this.#renderFilmCards(this.#shownFilmQuantity, this.#shownFilmQuantity + rest, this.#filmsMainCardList);
      this.#shownFilmQuantity += rest;
    }

    if (!this.#getFilmsToShowQuantity()) {
      this.#showMoreButton.destroyElement();
    }
  };
}

export { FilmDeskPresenter as default };
