import { getFilmsStatistic, getUserRank, getTopRatedFilmsData, getTopCommentedFilmsData } from './filter.js';
import { getRandomFilmData } from './mock/data.js';
import { render, replace, getRenderPosition } from './render.js';
import UserProfileView from './view/user-profile-view.js';
import MainMenuView from './view/main-menu-view.js';
import SortMenuView from './view/sort-menu-view.js';

import FilmsDeskView from './view/films-desk-view.js';
import FilmsSheetView from './view/films-sheet-view.js';
import FilmCardListView from './view/film-card-list-view.js';
import FilmCardView from './view/film-card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FilmFooterView from './view/films-quantity-footer-view.js';
import PopupView from './view/popup-view.js';

const FILM_CARD_INITIAL_VALUE = 5;
const FILM_EXTRA_SECTION = 1;
const FILM_EXTRA_QUANTITY = 2;

const RenderPosition = getRenderPosition();

const SectionMessages = {
  DEFAULT: 'All movies. Upcoming',
  RATED: 'Top rated',
  POPULAR: 'Most commented',
  NO_MOVIES: 'There are no movies in our database',
  NO_WATCHLIST: 'There are no movies to watch now',
  NO_HISTORY: 'There are no watched movies now',
  NO_FAVORITE: 'There are no favorite movies now'
};

const KeyEnum = {
  ESC: 'Escape',
};

const filmsData = getRandomFilmData();
const filmsTopRated = getTopRatedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);
const filmsTopCommented = getTopCommentedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);
const filmsStatistic = getFilmsStatistic(filmsData);
const userRank = getUserRank();


const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');

const filmsDesk = new FilmsDeskView();
const filmEmptySheet = new FilmsSheetView(SectionMessages.NO_MOVIES);
const filmsMainSheet = new FilmsSheetView(SectionMessages.DEFAULT, false, true);
const filmsMainCardList = new FilmCardListView();
const filmsRatedSheet = new FilmsSheetView(SectionMessages.RATED, FILM_EXTRA_SECTION);
const filmsRatedCardList = new FilmCardListView();
const filmsPopularSheet = new FilmsSheetView(SectionMessages.POPULAR, FILM_EXTRA_SECTION);
const filmsPopularCardList = new FilmCardListView();

let shownFilmQuantity = Math.min(filmsData.length, FILM_CARD_INITIAL_VALUE);
let currentPopup = null;

const onPopupClose = () => {
  document.body.classList.remove('.hide-overflow');
  currentPopup.removeElement();
  currentPopup = null;
};

const onEscKeyDown = (evt) => {
  if (evt.key === KeyEnum.ESC) {
    document.removeEventListener('keydown', onEscKeyDown);
    onPopupClose();
  }
};

const renderFilmCards = (container, filmData) => {
  const filmCard = new FilmCardView(filmData);
  const filmPopup = new PopupView(filmData);

  const onFilmCardClick = () => {

    const onCommentButtonCloseClick = (evt) => {
      evt.preventDefault();
      evt.target.closest('li').remove();
    };

    const onPopupButtonClose = () => {
      document.removeEventListener('keydown', onEscKeyDown);
      onPopupClose();
    };

    if (!document.body.hasAttribute('hide-overflow')) {
      document.body.classList.add('.hide-overflow');
    }

    if (currentPopup) {
      replace(currentPopup, filmPopup);
    }
    else {
      render(sectionFooter, filmPopup, RenderPosition.AFTEREND);
      document.addEventListener('keydown', onEscKeyDown);
    }

    filmPopup.setPopupCloseHandler(onPopupButtonClose);
    filmPopup.setCommentCloseHandlers(onCommentButtonCloseClick);

    currentPopup = filmPopup;
  };

  filmCard.setFilmClickHandler(onFilmCardClick);
  render(container, filmCard, RenderPosition.BEFOREEND);

};

const onShowMoreButtonClick = (evt) => {
  if (shownFilmQuantity < filmsData.length) {
    const lastShownQuantity = shownFilmQuantity;
    const restFilms = filmsData.length - shownFilmQuantity;

    shownFilmQuantity += (restFilms < FILM_CARD_INITIAL_VALUE) ? restFilms : FILM_CARD_INITIAL_VALUE;
    filmsData.slice(lastShownQuantity, shownFilmQuantity)
      .forEach((film) => renderFilmCards(filmsMainCardList, film));

    if (shownFilmQuantity >= filmsData.length) {
      evt.target.remove();
    }
  }
};

sectionMain.innerHTML = '';
render(sectionHeader, new UserProfileView(userRank), RenderPosition.BEFOREEND);
render(sectionMain, new MainMenuView(filmsStatistic), RenderPosition.BEFOREEND);
render(sectionMain, new SortMenuView(), RenderPosition.BEFOREEND);
render(sectionMain, filmsDesk, RenderPosition.BEFOREEND);

if (shownFilmQuantity) {

  render(filmsDesk, filmsMainSheet, RenderPosition.BEFOREEND);
  render(filmsMainSheet, filmsMainCardList, RenderPosition.BEFOREEND);

  if (filmsTopRated.length >= FILM_EXTRA_QUANTITY) {
    render(filmsDesk, filmsRatedSheet, RenderPosition.BEFOREEND);
    render(filmsRatedSheet, filmsRatedCardList, RenderPosition.BEFOREEND);
    filmsTopRated.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => renderFilmCards(filmsRatedCardList, film));
  }

  if (filmsTopCommented.length >= FILM_EXTRA_QUANTITY) {
    render(filmsDesk, filmsPopularSheet, RenderPosition.BEFOREEND);
    render(filmsPopularSheet, filmsPopularCardList, RenderPosition.BEFOREEND);
    filmsTopCommented.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => renderFilmCards(filmsPopularCardList, film));
  }

  filmsData.slice(0, shownFilmQuantity).forEach((film) => renderFilmCards(filmsMainCardList, film));

  if (filmsData.length > FILM_CARD_INITIAL_VALUE) {
    const showMoreButton = new ShowMoreButtonView().setButtonClickHandler(onShowMoreButtonClick);
    render(filmsMainCardList, showMoreButton, RenderPosition.AFTEREND);
  }

  render(footerStatistic, new FilmFooterView(filmsStatistic), RenderPosition.BEFOREEND);

} else {
  render(filmsDesk, filmEmptySheet, RenderPosition.BEFOREEND);
}
