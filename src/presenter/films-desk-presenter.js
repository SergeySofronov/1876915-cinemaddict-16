import { render, RenderPosition } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData, getFilmsDataByDate, filterFunctions } from '../filter.js';
import { SectionMessages, SortType, UserActions, UpdateTypes, FilterTypes } from '../const.js';

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
  #deskContainer = null;
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
  #filterModel = null;
  #filmsPresenters = new Map();
  #topRatedFilms = [];
  #topCommentedFilms = [];

  #activeFilm = null;
  #activeSortType = SortType.DEFAULT;

  #shownFilmQuantity = null;
  #restFilmQuantity = null;

  constructor(deskContainer, filmsModel, filterModel) {
    if (!((deskContainer instanceof AbstractView) || (deskContainer instanceof Element))) {
      throw new Error('Can\'t create instance of FilmDeskPresenter while renderContainer is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof AbstractObservable)) {
        throw new Error(`Can\\'t create instance of FilmDeskPresenter while argument${i - 1} is not an instance of AbstractObservable`);
      }
    }

    this.#deskContainer = deskContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filmsData() {

    const filterType = this.#filterModel.filterType;
    const films = this.#filmsModel.filmsData;
    const filteredTasks = filterFunctions[filterType](films);


    switch (this.#activeSortType) {
      case (SortType.RATE):
        return getTopRatedFilmsData(filteredTasks);

      case (SortType.DATE):
        return getFilmsDataByDate(filteredTasks);

      case (SortType.COMMENT):
        return getTopCommentedFilmsData(filteredTasks);

      default: case (SortType.DEFAULT):
        return filteredTasks;
    }
  }

  init = () => {
    this.#filmSortMenu.setSortClickHandler(this.#onSortMenuClick);
    render(this.#deskContainer, this.#filmSortMenu, RenderPosition.BEFOREEND);
    render(this.#deskContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    this.#renderDeskSheets(UserActions.RESET_DESK);
  }

  #getTotalFilmsQuantity = () => this.filmsData.length;

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

        //todo: сюда переместить принятие решений PATCH/MINOR/MAJOR? тогда можно будет сохранить логику wasInTopCommented
        if (this.#filterModel.filterType === FilterTypes.ALL) {
          this.#filmsModel.update(updateType, update);
        } else {
          this.#filmsModel.update(UpdateTypes.MINOR, update);
        }
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
        this.#resetDesk();
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
    const totalQuantity = this.#getTotalFilmsQuantity();
    if (totalQuantity > this.#shownFilmQuantity) {
      this.#restFilmQuantity = Math.min((totalQuantity - this.#shownFilmQuantity), FILM_SHOW_PER_STEP);

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
    if (!this.#getTotalFilmsQuantity()) {
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
      this.#shownFilmQuantity = Math.min(this.#getTotalFilmsQuantity(), FILM_SHOW_PER_STEP);

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
