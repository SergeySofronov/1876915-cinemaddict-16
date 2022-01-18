import { render, RenderPosition } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData, getFilmsDataByDate } from '../filter.js';
import { SectionMessages, SortType, UserActions, UpdateTypes } from '../const.js';

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
  #topRatedFilms = [];
  #topCommentedFilms = [];

  #activeFilm = null;
  #activeSortType = SortType.DEFAULT;

  #shownFilmQuantity = null;
  #totalFilmsQuantity = null;
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
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get filmsData() {
    switch (this.#activeSortType) {
      case (SortType.RATE):
        return getTopRatedFilmsData(this.#filmsModel.filmsData);

      case (SortType.DATE):
        return getFilmsDataByDate(this.#filmsModel.filmsData);

      case (SortType.COMMENT):
        return getTopCommentedFilmsData(this.#filmsModel.filmsData);

      default: case (SortType.DEFAULT):
        return this.#filmsModel.filmsData;
    }
  }

  init = () => {
    this.#totalFilmsQuantity = this.filmsData.length;
    this.#filmSortMenu.setSortClickHandler(this.#onSortMenuClick);
    render(this.#filmDeskRenderContainer, this.#filmSortMenu, RenderPosition.BEFOREEND);
    render(this.#filmDeskRenderContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    this.#renderDeskSheets(UserActions.RESET_DESK);
  }

  #getActiveFilmId = () => this.#activeFilm?.id;

  #setActiveFilm = (film) => {
    this.#activeFilm?.removePopup();
    this.#activeFilm = film;
  }

  #changeActiveFilm = () => {
    const activeFilmId = this.#getActiveFilmId();
    if (!activeFilmId) {

      return;
    }

    for (const [presenter, filmId] of this.#filmsPresenters.entries()) {
      if (filmId === activeFilmId) {
        presenter.createPopup();

        return;
      }
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case (UserActions.REMOVE_POPUP):
        this.#setActiveFilm(update);
        break;

      default:
        //todo: бесполезное действие, т.к. используется не глубокое копирование объектов в updateData() SmartView!
        this.#filmsModel.update(updateType, update);
        break;
    }
  }

  #wasInTopCommented = (film) => {
    const type = this.#activeSortType;
    this.#activeSortType = SortType.COMMENT;
    const indexOld = this.#topCommentedFilms.findIndex((item) => (item.id === film.id));
    const indexNew = this.filmsData.indexOf(film);
    const result = !(((indexOld === -1) || (indexOld === indexNew)));
    this.#activeSortType = type;

    return result;
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case (UpdateTypes.PATCH):
        this.#updateFilmsPresenters(data);
        break;
      case (UpdateTypes.MINOR):
        if (this.#wasInTopCommented(data)) {
          this.#resetCards();
        } else {
          this.#updateFilmsPresenters(data);
        }
        break;
      case (UpdateTypes.MAJOR):
        //todo: обновить всю доску
        break;
    }
  }

  #updateFilmsPresenters = (filmPresenter) => {
    for (const [presenter, filmId] of this.#filmsPresenters.entries()) {
      if (filmId === filmPresenter.id) {
        presenter.init(filmPresenter);
      }
    }
  }

  #getFilmsToShow = () => {
    if (this.#totalFilmsQuantity > this.#shownFilmQuantity) {
      this.#restFilmQuantity = Math.min((this.#totalFilmsQuantity - this.#shownFilmQuantity), FILM_SHOW_PER_STEP);

      return this.filmsData.slice(this.#shownFilmQuantity, this.#shownFilmQuantity + this.#restFilmQuantity);
    }

    return null;
  }

  #renderFilmCards = (filmsList, filmsData) => {
    filmsData.forEach((film) => {
      if (film.id) {
        const filmPresenter = new FilmPresenter(filmsList, this.#handleViewAction, this.#getActiveFilmId, this.#setActiveFilm);
        filmPresenter.init(film);
        this.#filmsPresenters.set(filmPresenter, film.id);
      }
    });
  }

  #renderSheet = (filmsSheet, filmsList) => {
    render(this.#filmsDesk, filmsSheet, RenderPosition.AFTERBEGIN);
    render(filmsSheet, filmsList, RenderPosition.BEFOREEND);
  }

  #getExtraFilmsData = (sortType) => {
    const savedSort = this.#activeSortType;
    this.#activeSortType = sortType;
    const data = this.filmsData.slice(0, FILM_EXTRA_QUANTITY);
    this.#activeSortType = savedSort;

    return data;
  }

  #renderDeskSheets = (isDeskReset) => {
    if (!this.#totalFilmsQuantity) {
      render(this.#filmsDesk, this.#filmEmptySheet, RenderPosition.BEFOREEND);

      return;
    }

    this.#topCommentedFilms = this.#getExtraFilmsData(SortType.COMMENT);
    if (this.#topCommentedFilms.length >= FILM_EXTRA_QUANTITY) {
      if (isDeskReset) {
        this.#renderSheet(this.#filmsPopularSheet, this.#filmsPopularCardList);
      }
      this.#renderFilmCards(this.#filmsPopularCardList, this.#topCommentedFilms);
    }

    this.#topRatedFilms = this.#getExtraFilmsData(SortType.RATE);
    if (this.#topRatedFilms.length >= FILM_EXTRA_QUANTITY) {
      if (isDeskReset) {
        this.#renderSheet(this.#filmsRatedSheet, this.#filmsRatedCardList);
      }
      this.#renderFilmCards(this.#filmsRatedCardList, this.#topRatedFilms);
    }

    if (isDeskReset) {
      this.#renderSheet(this.#filmsMainSheet, this.#filmsMainCardList);
      this.#shownFilmQuantity = Math.min(this.#totalFilmsQuantity, FILM_SHOW_PER_STEP);

      if (this.#getFilmsToShow()) {
        this.#showMoreButton.setButtonClickHandler(this.#onShowMoreButtonClick);
        render(this.#filmsMainCardList, this.#showMoreButton, RenderPosition.AFTEREND);
      }
    }
    this.#renderFilmCards(this.#filmsMainCardList, this.filmsData.slice(0, this.#shownFilmQuantity));
  }

  #clearPresenters = () => {
    for (const [presenter,] of this.#filmsPresenters.entries()) {
      presenter.removeCard();
    }
    this.#filmsPresenters.clear();
  }

  #clearDesk = () => {
    this.#filmsMainCardList.destroyElement();
    this.#filmsRatedCardList.destroyElement();
    this.#filmsPopularCardList.destroyElement();
    this.#showMoreButton.destroyElement();
  }

  #resetCards = () => {
    this.#clearPresenters();
    this.#renderDeskSheets(UserActions.RESET_CARDS);
  }

  #resetDesk = () => {
    this.#clearPresenters();
    this.#clearDesk();
    this.#renderDeskSheets(UserActions.RESET_DESK);
  }

  #onSortMenuClick = (evt) => {
    if (evt.target.tagName === 'A') {
      const type = evt.target.dataset.sortType;
      if (this.#activeSortType !== type) {
        this.#activeSortType = type;
        this.#resetDesk();
        this.#changeActiveFilm();
      }
    }
  }

  #onShowMoreButtonClick = () => {
    const rest = this.#getFilmsToShow();
    if (rest) {
      this.#renderFilmCards(this.#filmsMainCardList, rest);
      this.#shownFilmQuantity += rest.length;
    }

    if (!this.#getFilmsToShow()) {
      this.#showMoreButton.destroyElement();
    }
  };
}

export { FilmDeskPresenter as default };
