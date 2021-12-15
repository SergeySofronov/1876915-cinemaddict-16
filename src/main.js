import { getFilmsStatistic, getUserRank } from './filter.js';
import { getRandomFilmData } from './mock/data.js';
import { render, RenderPosition } from './render.js';
import UserProfileView from './view/user-profile-view.js';
import MainMenuView from './view/main-menu-view.js';
import SortMenuView from './view/sort-menu-view.js';
import FilmFooterView from './view/films-quantity-footer-view.js';
import FilmDeskPresenter from './presenter/films-desk-presenter.js';

const filmsData = getRandomFilmData();
const filmsStatistic = getFilmsStatistic(filmsData);
const userRank = getUserRank();

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');

render(sectionHeader, new UserProfileView(userRank), RenderPosition.BEFOREEND);
render(sectionMain, new MainMenuView(filmsStatistic), RenderPosition.BEFOREEND);
render(sectionMain, new SortMenuView(), RenderPosition.BEFOREEND);

const filmDesk = new FilmDeskPresenter(sectionMain, sectionFooter);
filmDesk.init(filmsData);

if (filmsData.length) {
  render(footerStatistic, new FilmFooterView(filmsStatistic), RenderPosition.BEFOREEND);
}
