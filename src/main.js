import { getFilmsStatistic, getUserRank, getTopRatedFilmsData, getTopCommentedFilmsData } from './filter.js';
import { getRandomFilmData } from './mock/data.js';
import { render, replace, getRenderPosition } from './render.js';
import UserProfileView from './view/user-profile.js';
import MainMenuView from './view/menu-main.js';
import SortMenuView from './view/menu-sort.js';
import FilmsAllView from './view/films-section.js';
import FilmsEmptyView from './view/film-section-empty.js';
import FilmsListView from './view/films-list-section.js';
import FilmCardListView from './view/films-card-container.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmFooterView from './view/film-quantity-footer.js';
import PopupView from './view/popup.js';

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

let shownFilmQuantity = Math.min(filmsData.length, FILM_CARD_INITIAL_VALUE);
let currentPopup = null;

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');

const filmsAllSection = new FilmsAllView();
const filmMainList = new FilmsListView(SectionMessages.DEFAULT);
const filmMainCardList = new FilmCardListView();
const filmRatedList = new FilmsListView(SectionMessages.RATED, FILM_EXTRA_SECTION);
const filmRatedCardList = new FilmCardListView();
const filmPopularList = new FilmsListView(SectionMessages.POPULAR, FILM_EXTRA_SECTION);
const filmPopularCardList = new FilmCardListView();

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
      .forEach((film) => renderFilmCards(filmMainCardList, film));

    if (shownFilmQuantity >= filmsData.length) {
      evt.target.remove();
    }
  }
};

sectionMain.innerHTML = '';
render(sectionHeader, new UserProfileView(userRank), RenderPosition.BEFOREEND);
render(sectionMain, new MainMenuView(filmsStatistic), RenderPosition.BEFOREEND);
render(sectionMain, new SortMenuView(), RenderPosition.BEFOREEND);
render(sectionMain, filmsAllSection, RenderPosition.BEFOREEND);

if (shownFilmQuantity) {

  render(filmsAllSection, filmMainList, RenderPosition.BEFOREEND);
  render(filmMainList, filmMainCardList, RenderPosition.BEFOREEND);

  if (filmsTopRated.length >= FILM_EXTRA_QUANTITY) {
    render(filmsAllSection, filmRatedList, RenderPosition.BEFOREEND);
    render(filmRatedList, filmRatedCardList, RenderPosition.BEFOREEND);
    filmsTopRated.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => renderFilmCards(filmRatedCardList, film));
  }

  if (filmsTopCommented.length >= FILM_EXTRA_QUANTITY) {
    render(filmsAllSection, filmPopularList, RenderPosition.BEFOREEND);
    render(filmPopularList, filmPopularCardList, RenderPosition.BEFOREEND);
    filmsTopCommented.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => renderFilmCards(filmPopularCardList, film));
  }

  filmsData.slice(0, shownFilmQuantity).forEach((film) => renderFilmCards(filmMainCardList, film));

  if (filmsData.length > FILM_CARD_INITIAL_VALUE) {
    const showMoreButton = new ShowMoreButtonView().setButtonClickHandler(onShowMoreButtonClick);
    render(filmMainCardList, showMoreButton, RenderPosition.AFTEREND);
  }

  render(footerStatistic, new FilmFooterView(filmsStatistic), RenderPosition.BEFOREEND);

} else {
  render(filmsAllSection, new FilmsEmptyView(SectionMessages.NO_MOVIES), RenderPosition.BEFOREEND);
}
