import { getFilmsStatistic, getUserRank } from './filter.js';
import { getRandomFilmData } from './mock/data.js';
import { render, RenderPosition } from './render.js';
import UserProfileView from './view/user-profile-view.js';
import FilmFooterView from './view/films-quantity-footer-view.js';
import FilmDeskPresenter from './presenter/films-desk-presenter.js';
import FilterMenuPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';

const filmsData = getRandomFilmData();
const filmsStatistic = getFilmsStatistic(filmsData);
const userRank = getUserRank();

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');

render(sectionHeader, new UserProfileView(userRank), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel;
filmsModel.filmsData = filmsData;
const filterModel = new FilterModel;

const filterMenu = new FilterMenuPresenter(sectionMain, filterModel, filmsModel);
filterMenu.init();
const filmDesk = new FilmDeskPresenter(sectionMain, filmsModel, filterModel);
filmDesk.init(filmsData);

if (filmsData.length) {
  render(footerStatistic, new FilmFooterView(filmsStatistic), RenderPosition.BEFOREEND);
}
