import { render, RenderPosition, replace } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData, getFilmsDataByDate, filterFunctions } from '../filter.js';
import { SectionMessages, SortTypes, UserActions, UpdateTypes, FilterTypes } from '../const.js';

import AbstractObservable from '../model/abstract-observable.js';
import AbstractView from '../view/abstract-view.js';
import SortMenuView from '../view/sort-menu-view.js';
import FilmsDeskView from '../view/films-desk-view.js';
import FilmsSheetView from '../view/films-sheet-view.js';
import FilmsSheetTitleView from '../view/films-sheet-title-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILM_SHOW_PER_STEP = 5;
const FILM_EXTRA_QUANTITY = 2;

class FilmDeskPresenter {
  #deskContainer = null;
  #filmsSortMenu = null;
  #filmsDesk = null;
  #filmsStats = null;
  #filmsMainSheet = new FilmsSheetView();
  #filmsRatedSheet = new FilmsSheetView(true);
  #filmsPopularSheet = new FilmsSheetView(true);

  #emptySheetTitle = null;
  #filmsMainSheetTitle = new FilmsSheetTitleView(SectionMessages.DEFAULT);
  #filmsRatedSheetTitle = new FilmsSheetTitleView(SectionMessages.RATED);
  #filmsPopularSheetTitle = new FilmsSheetTitleView(SectionMessages.POPULAR);

  #filmsMainCardList = new FilmCardListView();
  #filmsRatedCardList = new FilmCardListView();
  #filmsPopularCardList = new FilmCardListView();
  #showMoreButton = null;

  #filmsModel = null;
  #filterModel = null;
  #filmsPresenters = new Map();

  #topRatedFilms = [];
  #topCommentedFilms = [];

  #activeFilm = null;
  #activeSortType = SortTypes.DEFAULT;
  #activeFilterType = FilterTypes.ALL;

  #shownFilmsQuantity = null;
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

    this.#activeFilterType = this.#filterModel.filterType;
    const films = this.#filmsModel.filmsData;
    const filteredTasks = filterFunctions[this.#activeFilterType](films);

    switch (this.#activeSortType) {
      case (SortTypes.RATE):
        return getTopRatedFilmsData(filteredTasks);

      case (SortTypes.DATE):
        return getFilmsDataByDate(filteredTasks);

      case (SortTypes.TOP_COMMENT):
        return getTopCommentedFilmsData(films);

      case (SortTypes.TOP_RATE):
        return getTopRatedFilmsData(films);

      default: case (SortTypes.DEFAULT):
        return filteredTasks;
    }
  }

  init = () => {
    this.#renderDesk();
    this.#renderSortMenu();

    this.#updateExtraFilmsData();

    if (this.#topCommentedFilms.length >= FILM_EXTRA_QUANTITY) {
      this.#renderSheet(this.#filmsPopularSheet, this.#filmsPopularSheetTitle, this.#filmsPopularCardList);
    }

    if (this.#topRatedFilms.length >= FILM_EXTRA_QUANTITY) {
      this.#renderSheet(this.#filmsRatedSheet, this.#filmsRatedSheetTitle, this.#filmsRatedCardList);
    }

    this.#renderSheet(this.#filmsMainSheet, this.#filmsMainSheetTitle, this.#filmsMainCardList);
    this.#shownFilmsQuantity = Math.min(this.#getFilteredFilmsQuantity(), FILM_SHOW_PER_STEP);

    this.#renderCards();
  };

  #renderSheet = (filmsSheet, sheetTitle, filmsList) => {
    render(this.#filmsDesk, filmsSheet, RenderPosition.AFTERBEGIN);
    render(filmsSheet, sheetTitle, RenderPosition.AFTERBEGIN);
    render(filmsSheet, filmsList, RenderPosition.BEFOREEND);
  }

  #renderDesk = () => {
    if (!this.#filmsDesk) {
      this.#filmsDesk = new FilmsDeskView();
      render(this.#deskContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    }
  }

  #renderSortMenu = () => {
    const prevSortMenu = this.#filmsSortMenu;

    if (!this.filmsData.length) {
      this.#filmsSortMenu?.destroyElement();
      this.#filmsSortMenu = null;
      return;
    }

    if (((prevSortMenu) && (prevSortMenu.sortType === SortTypes.DEFAULT))) {
      return;
    }

    this.#filmsSortMenu = new SortMenuView();
    this.#filmsSortMenu.setSortClickHandler(this.#onSortMenuClick);
    if (prevSortMenu) {
      replace(prevSortMenu, this.#filmsSortMenu);
    } else {
      render(this.#filmsDesk, this.#filmsSortMenu, RenderPosition.BEFOREBEGIN);
    }
  }

  #renderEmptyTitle = () => {
    if ((this.#emptySheetTitle) && (this.#emptySheetTitle.messageType === this.#activeFilterType)) {
      return;
    }

    this.#emptySheetTitle = new FilmsSheetTitleView(this.#activeFilterType);
    if (this.#filmsMainSheetTitle) {
      replace(this.#filmsMainSheetTitle, this.#emptySheetTitle);
    } else {
      render(this.#filmsMainSheet, this.#emptySheetTitle, RenderPosition.AFTERBEGIN);
    }
  }

  #getFilteredFilmsQuantity = () => this.filmsData.length;

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
        presenter.createPopup(this.#activeFilm.popup);
        this.#activeFilm = presenter;
        return;
      }
    }
  }

  #isCommentRatingChanged = (film) => {
    if (film) {
      const indexOld = this.#topCommentedFilms.findIndex((item) => (item.id === film.id));
      if (indexOld === -1) {
        if (film.comments.length > this.#topCommentedFilms[this.#topCommentedFilms.length - 1].comments.length) {

          return true;
        }
      } else {
        const indexTotal = this.#filmsModel.filmsData.findIndex((item) => (item.id === film.id));
        const newTopCommentFilms = [...this.#filmsModel.filmsData];
        newTopCommentFilms.splice(indexTotal, 1, film);
        const indexNew = getTopCommentedFilmsData(newTopCommentFilms).findIndex((item) => (item.id === film.id));
        if ((indexNew === -1) || (indexOld !== indexNew)) {

          return true;
        }
      }
    }

    return false;
  }

  #isUpdatePatch = (update, actionDetails) => {
    const isFilterTypeStats = (this.#filterModel.filterType === FilterTypes.STATS);
    const isFilterTypeAll = (this.#filterModel.filterType === FilterTypes.ALL);
    const isFilterAndActionSame = Boolean((actionDetails) && (this.#filterModel.filterType !== actionDetails));

    return Boolean(isFilterTypeStats || ((isFilterTypeAll || isFilterAndActionSame) && (!this.#isCommentRatingChanged(update))));
  }

  #handleViewAction = (update, actionType, actionDetails) => {

    switch (actionType) {
      case (UserActions.UPDATE_ACTIVE):
        this.#setActiveFilm(update);
        break;

      case (UserActions.UPDATE_DATA):
        if (this.#isUpdatePatch(update, actionDetails)) {
          this.#filmsModel.update(UpdateTypes.PATCH, update);
        } else {
          this.#filmsModel.update(UpdateTypes.MINOR, update);
        }
        break;

      default: break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case (UpdateTypes.PATCH):
        this.#updateFilmsPresenters(data);
        break;

      case (UpdateTypes.MINOR):
        if (this.#filmsDesk) {
          this.#resetCards(this.#filterModel.filterType);
        } else {
          this.init();
        }
        break;

      case (UpdateTypes.MAJOR):
        this.#destroyDesk();
        break;

      default: break;
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
    const totalQuantity = this.#getFilteredFilmsQuantity();
    if (totalQuantity > this.#shownFilmsQuantity) {
      this.#restFilmQuantity = Math.min((totalQuantity - this.#shownFilmsQuantity), FILM_SHOW_PER_STEP);

      return this.filmsData.slice(this.#shownFilmsQuantity, this.#shownFilmsQuantity + this.#restFilmQuantity);
    }

    return null;
  }

  #renderFilmCards = (filmsList, filmsData) => {
    filmsData.forEach((film) => {
      if (film.id) {
        const filmPresenter = new FilmPresenter(filmsList, this.#handleViewAction, this.#getActiveFilmId);
        filmPresenter.init(film);
        this.#filmsPresenters.set(filmPresenter, film.id);
      }
    });
  }

  #getExtraFilmsData = (sortType) => {
    const savedSort = this.#activeSortType;
    this.#activeSortType = sortType;
    const data = this.filmsData.slice(0, FILM_EXTRA_QUANTITY);
    this.#activeSortType = savedSort;

    return data;
  }

  #updateExtraFilmsData = () => {
    this.#topCommentedFilms = this.#getExtraFilmsData(SortTypes.TOP_COMMENT);
    this.#topRatedFilms = this.#getExtraFilmsData(SortTypes.TOP_RATE);
  }

  #renderShowMoreButton = () => {
    const restFilms = this.#getFilmsToShow();
    if (!this.#showMoreButton) {
      if (restFilms) {
        this.#showMoreButton = new ShowMoreButtonView();
        this.#showMoreButton.setButtonClickHandler(this.#onShowMoreButtonClick);
        render(this.#filmsMainCardList, this.#showMoreButton, RenderPosition.AFTEREND);
      }
    } else if (!restFilms) {
      this.#showMoreButton.destroyElement();
      this.#showMoreButton = null;
    }
  }

  #replaceEmptyTitle = () => {
    if (this.#emptySheetTitle) {
      replace(this.#emptySheetTitle, this.#filmsMainSheetTitle);
      this.#emptySheetTitle = null;
    }
  }

  #renderCards = () => {

    if (this.#topCommentedFilms.length >= FILM_EXTRA_QUANTITY) {
      this.#renderFilmCards(this.#filmsPopularCardList, this.#topCommentedFilms);
    }

    if (this.#topCommentedFilms.length >= FILM_EXTRA_QUANTITY) {
      this.#renderFilmCards(this.#filmsRatedCardList, this.#topRatedFilms);
    }

    if (this.filmsData.length) {
      this.#replaceEmptyTitle();
    } else {
      this.#renderEmptyTitle();
    }

    if(this.#shownFilmsQuantity % FILM_SHOW_PER_STEP){
      this.#shownFilmsQuantity += this.filmsData.length - this.#shownFilmsQuantity;
    }

    this.#renderFilmCards(this.#filmsMainCardList, this.filmsData.slice(0, this.#shownFilmsQuantity));
    this.#renderShowMoreButton();
  }

  #destroyCards = () => {
    for (const [presenter,] of this.#filmsPresenters.entries()) {
      presenter.removeCard();
    }
    this.#filmsPresenters.clear();
  }

  #destroyDesk = () => {
    this.#destroyCards();
    if (this.#filmsDesk) {
      this.#filmsSortMenu?.destroyElement();
      this.#filmsSortMenu = null;
      this.#showMoreButton?.destroyElement();
      this.#showMoreButton = null;
      this.#filmsDesk.destroyElement();
      this.#filmsDesk = null;
    }
  }

  #restoreShownFilmsQuantity = () => (this.#shownFilmsQuantity = (this.#getFilteredFilmsQuantity() > FILM_SHOW_PER_STEP) ? FILM_SHOW_PER_STEP : this.#shownFilmsQuantity);

  #resetCards = (filterType) => {
    if ((this.#activeFilterType !== filterType) || (!this.#filmsSortMenu) || (!this.filmsData.length)) {
      this.#restoreShownFilmsQuantity();
      this.#renderSortMenu();
    }
    this.#destroyCards();
    this.#updateExtraFilmsData();
    this.#renderCards();
    this.#changeActiveFilm();
  }

  #onSortMenuClick = (evt) => {
    const type = evt.target.dataset.sortType;
    if (this.#activeSortType !== type) {
      this.#activeSortType = type;
      this.#restoreShownFilmsQuantity();
      this.#resetCards(this.#activeFilterType);
    }
  }

  #onShowMoreButtonClick = () => {
    const rest = this.#getFilmsToShow();
    if (rest) {
      this.#renderFilmCards(this.#filmsMainCardList, rest);
      this.#shownFilmsQuantity += rest.length;
    }

    if (!this.#getFilmsToShow()) {
      this.#showMoreButton.destroyElement();
      this.#showMoreButton = null;
    }
  };
}

export { FilmDeskPresenter as default };
