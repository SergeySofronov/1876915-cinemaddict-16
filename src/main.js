import ApiService from './api-service.js';
import FilmDeskPresenter from './presenter/films-desk-presenter.js';
import FilterMenuPresenter from './presenter/filter-presenter.js';
import HeaderProfilePresenter from './presenter/header-profile-presenter.js';
import FooterProfilePresenter from './presenter/footer-profile-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';

const AUTHORIZATION = 'Basic er883jdz123';
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict/';

const sectionHeader = document.querySelector('.header');
const sectionMain = document.querySelector('.main');
const sectionFooter = document.querySelector('.footer');
const footerStatistic = sectionFooter.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(new ApiService(END_POINT, AUTHORIZATION));
filmsModel.init();

const filterModel = new FilterModel();

const filterMenu = new FilterMenuPresenter(sectionMain, filterModel, filmsModel);
filterMenu.init();

const filmDesk = new FilmDeskPresenter(sectionMain, filmsModel, filterModel);
filmDesk.init();

const headerProfile = new HeaderProfilePresenter(sectionHeader, filmsModel);
headerProfile.init();

const footerProfile = new FooterProfilePresenter(footerStatistic, filmsModel);
footerProfile.init();

