import { getFilmsStatistic, getUserRank, getTopRatedFilmsData, getTopCommentedFilmsData } from './filter.js';
import { getRandomFilmData } from './mock/data.js';
import { render, getRenderPosition } from './render.js';
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

const filmsData = getRandomFilmData();
const filmsTopRated = getTopRatedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);
const filmsTopCommented = getTopCommentedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);
const filmsStatistic = getFilmsStatistic(filmsData);
const userRank = getUserRank();

let shownFilmQuantity = Math.min(filmsData.length, FILM_CARD_INITIAL_VALUE);

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');

const filmsAll = new FilmsAllView();
const filmMainList = new FilmsListView(SectionMessages.DEFAULT);
const filmMainCardList = new FilmCardListView();
const filmRatedList = new FilmsListView(SectionMessages.RATED, FILM_EXTRA_SECTION);
const filmRatedCardList = new FilmCardListView();
const filmPopularList = new FilmsListView(SectionMessages.POPULAR, FILM_EXTRA_SECTION);
const filmPopularCardList = new FilmCardListView();

const renderFilmCards = (container, filmData) => {
  const filmCard = new FilmCardView(filmData);
  const filmPopup = new PopupView(filmData);

  const onFilmCardClick = () => {
    const popupPrevious = document.querySelector('.film-details');

    if (!document.body.hasAttribute('hide-overflow')) {
      document.body.classList.add('.hide-overflow');
    }

    const onButtonCloseClick = (evt) => {
      evt.target.closest('li').remove();
    };

    const onPopupButtonClose = () => {
      document.body.classList.remove('.hide-overflow');
      filmPopup.removeElement();
    };

    if (popupPrevious) {
      popupPrevious.replaceWith(filmPopup.element);
    } else {
      render(sectionFooter, filmPopup.element, RenderPosition.AFTEREND);
    }

    const popupLoadedCommentSelectors = filmPopup.element.querySelectorAll('.film-details__bottom-container li button');
    const popupButtonClose = filmPopup.element.querySelector('.film-details__close-btn');
    popupButtonClose.addEventListener('click', onPopupButtonClose);
    popupLoadedCommentSelectors.forEach((commentSelector) => commentSelector.addEventListener('click', onButtonCloseClick));

  };

  filmCard.element.querySelector('.film-card__link').addEventListener('click', onFilmCardClick);

  render(container, filmCard.element, RenderPosition.BEFOREEND);

};

const onShowMoreButtonClick = (evt) => {
  if (shownFilmQuantity < filmsData.length) {
    const lastShownQuantity = shownFilmQuantity;
    const restFilms = filmsData.length - shownFilmQuantity;

    shownFilmQuantity += (restFilms < FILM_CARD_INITIAL_VALUE) ? restFilms : FILM_CARD_INITIAL_VALUE;
    filmsData.slice(lastShownQuantity, shownFilmQuantity)
      .forEach((film) => renderFilmCards(filmMainCardList.element, film));

    if (shownFilmQuantity >= filmsData.length) {
      evt.target.remove();
    }
  }
};

sectionMain.innerHTML = '';
render(sectionHeader, new UserProfileView(userRank).element, RenderPosition.BEFOREEND);
render(sectionMain, new MainMenuView(filmsStatistic).element, RenderPosition.BEFOREEND);
render(sectionMain, new SortMenuView().element, RenderPosition.BEFOREEND);
render(sectionMain, filmsAll.element, RenderPosition.BEFOREEND);

if (shownFilmQuantity) {

  render(filmsAll.element, filmMainList.element, RenderPosition.BEFOREEND);
  render(filmMainList.element, filmMainCardList.element, RenderPosition.BEFOREEND);

  if (filmsTopRated.length >= FILM_EXTRA_QUANTITY) {
    render(filmsAll.element, filmRatedList.element, RenderPosition.BEFOREEND);
    render(filmRatedList.element, filmRatedCardList.element, RenderPosition.BEFOREEND);
    filmsTopRated.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => renderFilmCards(filmRatedCardList.element, film));
  }

  if (filmsTopCommented.length >= FILM_EXTRA_QUANTITY) {
    render(filmsAll.element, filmPopularList.element, RenderPosition.BEFOREEND);
    render(filmPopularList.element, filmPopularCardList.element, RenderPosition.BEFOREEND);
    filmsTopCommented.slice(0, FILM_EXTRA_QUANTITY).forEach((film) => renderFilmCards(filmPopularCardList.element, film));
  }

  filmsData.slice(0, shownFilmQuantity).forEach((film) => renderFilmCards(filmMainCardList.element, film));

  if (filmsData.length > FILM_CARD_INITIAL_VALUE) {
    const showMoreButton = new ShowMoreButtonView();
    showMoreButton.element.addEventListener('click', onShowMoreButtonClick);
    render(filmMainCardList.element, showMoreButton.element, RenderPosition.AFTEREND);
  }

  render(footerStatistic, new FilmFooterView(filmsStatistic).element, RenderPosition.BEFOREEND);

} else {
  render(filmsAll.element, new FilmsEmptyView(SectionMessages.NO_MOVIES).element, RenderPosition.BEFOREEND);
}
