import { render, replace, RenderPosition } from '../render.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData } from '../filter.js';
import { SectionMessages, SortType, KeyEnum } from '../const.js';

import FilmsDeskView from '../view/films-desk-view.js';
import FilmsSheetView from '../view/films-sheet-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';

const FILM_CARD_INITIAL_VALUE = 5;
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

  #filmsData = [];
  #filmsDataDefault = [];
  #filmsTopRated = [];
  #filmsTopCommented = [];
  #shownFilmQuantity = null;
  #currentPopup = null;

  constructor(parentContainer, footerContainer) {
    this.#parentContainer = parentContainer;
    this.#footerContainer = footerContainer;
  }

  init(filmsData) {
    this.#filmsData = [...filmsData];
    this.#filmsDataDefault = [...this.#filmsData];
    this.#shownFilmQuantity = Math.min(this.#filmsData.length, FILM_CARD_INITIAL_VALUE);

    //todo:delete filmsTopCommented и filmsTopRated
    this.#filmsTopRated = getTopRatedFilmsData(this.#filmsData).slice(0, FILM_EXTRA_QUANTITY);
    this.#filmsTopCommented = getTopCommentedFilmsData(this.#filmsData).slice(0, FILM_EXTRA_QUANTITY);


    render(this.#parentContainer, this.#filmsDesk, RenderPosition.BEFOREEND);
    this.#renderDesk();
  }

  #onPopupClose = () => {
    document.body.classList.remove('.hide-overflow');
    this.#currentPopup.removeElement();
    this.#currentPopup = null;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === KeyEnum.ESC) {
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#onPopupClose();
    }
  };

  #onCommentButtonCloseClick = (evt) => {
    evt.preventDefault();
    evt.target.closest('li').remove();
  };

  #onPopupButtonClose = () => {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#onPopupClose();
  };

  #renderFilmCards = (container, filmData) => {
    const filmCard = new FilmCardView(filmData);
    const filmPopup = new PopupView(filmData);

    const onFilmCardClick = () => {

      if (!document.body.hasAttribute('hide-overflow')) {
        document.body.classList.add('.hide-overflow');
      }

      if (this.#currentPopup) {
        replace(this.#currentPopup, filmPopup);
      }
      else {
        render(this.#footerContainer, filmPopup, RenderPosition.AFTEREND);
        document.addEventListener('keydown', this.#onEscKeyDown);
      }

      filmPopup.setPopupCloseHandler(this.#onPopupButtonClose);
      filmPopup.setCommentCloseHandlers(this.#onCommentButtonCloseClick);

      this.#currentPopup = filmPopup;
    };

    filmCard.setFilmClickHandler(onFilmCardClick);
    render(container, filmCard, RenderPosition.BEFOREEND);

  };

  #onShowMoreButtonClick = (evt) => {
    if (this.#shownFilmQuantity < this.#filmsData.length) {
      const lastShownQuantity = this.#shownFilmQuantity;
      const restFilms = this.#filmsData.length - this.#shownFilmQuantity;

      this.#shownFilmQuantity += (restFilms < FILM_CARD_INITIAL_VALUE) ? restFilms : FILM_CARD_INITIAL_VALUE;
      this.#filmsData.slice(lastShownQuantity, this.#shownFilmQuantity)
        .forEach((film) => this.#renderFilmCards(this.#filmsMainCardList, film));

      if (this.#shownFilmQuantity >= this.#filmsData.length) {
        evt.target.remove();
      }
    }
  };

  #renderDesk() {
    if (this.#shownFilmQuantity) {

      render(this.#filmsDesk, this.#filmsMainSheet, RenderPosition.BEFOREEND);
      render(this.#filmsMainSheet, this.#filmsMainCardList, RenderPosition.BEFOREEND);

      if (this.#filmsTopRated.length >= FILM_EXTRA_QUANTITY) {
        render(this.#filmsDesk, this.#filmsRatedSheet, RenderPosition.BEFOREEND);
        render(this.#filmsRatedSheet, this.#filmsRatedCardList, RenderPosition.BEFOREEND);
        this.#filmsTopRated.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => this.#renderFilmCards(this.#filmsRatedCardList, film));
      }

      if (this.#filmsTopCommented.length >= FILM_EXTRA_QUANTITY) {
        render(this.#filmsDesk, this.#filmsPopularSheet, RenderPosition.BEFOREEND);
        render(this.#filmsPopularSheet, this.#filmsPopularCardList, RenderPosition.BEFOREEND);
        this.#filmsTopCommented.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => this.#renderFilmCards(this.#filmsPopularCardList, film));
      }

      this.#filmsData.slice(0, this.#shownFilmQuantity).forEach((film) => this.#renderFilmCards(this.#filmsMainCardList, film));

      if (this.#filmsData.length > FILM_CARD_INITIAL_VALUE) {
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

}

export { FilmDeskPresenter as default };
