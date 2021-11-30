import { getUserProfileTemplate } from './view/user-profile.js';
import { getMainMenuTemplate } from './view/menu-main.js';
import { getFilmSortMenuTemplate } from './view/menu-sort.js';
import { getFilmSectionTemplate } from './view/films-section.js';
import { getFilmListSectionTemplate } from './view/film-list-section.js';
import { getFilmSectionEmptyTemplate } from './view/film-section-empty.js';
import { getFilmCardTemplate } from './view/film-card.js';
import { getFilmFooterTemplate } from './view/film-quantity-footer.js';
import { getShowMoreButtonTemplate } from './view/show-more-button.js';
import { getPopupTemplate } from './view/popup.js';
import { getFilmsStatistic, getUserRank } from './mock/filter.js';
import { getRandomFilmData } from './mock/data.js';
import { getTopRatedFilmsData, getTopCommentedFilmsData } from './mock/utils.js';

const FILM_CARD_INITIAL_VALUE = 5;
const FILM_EXTRA_SECTION = 1;
const FILM_EXTRA_QUANTITY = 2;


const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const SectionMessages = {
  DEFAULT: 'All movies. Upcoming',
  RATED: 'Top rated',
  POPULAR: 'Most commented',
  NO_MOVIES: 'There are no movies in our database',
  NO_WATCHLIST: 'There are no movies to watch now',
  NO_HISTORY: 'There are no watched movies now',
  NO_FAVORITE: 'There are no favorite movies now'
};

//Создание массива объектов с данными фильмов
const filmsData = getRandomFilmData();

//Фильмы с самым высоким рейтингом
const filmsTopRated = getTopRatedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);

//Фильмы с наибольшим количеством комментариев
const filmsTopCommented = getTopCommentedFilmsData(filmsData).slice(0, FILM_EXTRA_QUANTITY);

//Объект со статистикой по всем фильмам
const filmStatistics = getFilmsStatistic(filmsData);

//Ранг пользователя
const userRank = getUserRank();

//Количество первоначально отображаемых фильмов
const shownFilmQuantity = (filmsData.length > FILM_CARD_INITIAL_VALUE) ?
  FILM_CARD_INITIAL_VALUE :
  filmsData.length;

const sectionHeader = document.querySelector('.header');    //header
const sectionMain = document.querySelector('.main');        //main
const sectionFooter = document.querySelector('.footer');    //footer
const footerStatistic = sectionFooter.querySelector('.footer__statistics'); // элемент для отображения общего количества фильмов
sectionMain.innerHTML = '';

//Функция для отрисовки HTML-шаблона в DOM
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//Отображение основного списка карточек фильмов
const renderCardsHeapTemplate = (upperBorder, lowerBorder, cb) => {
  for (let i = upperBorder; i < lowerBorder; i++) {
    cb();
  }
};

//Отображение профиля пользователя
renderTemplate(sectionHeader, getUserProfileTemplate?.(userRank), RenderPosition.BEFOREEND);

//Отображение главного меню
renderTemplate(sectionMain, getMainMenuTemplate?.(filmStatistics), RenderPosition.BEFOREEND);

//Отображение меню сортировки фильмов
renderTemplate(sectionMain, getFilmSortMenuTemplate?.(), RenderPosition.BEFOREEND);

if (shownFilmQuantity) {

  //Добавление основной секции фильмов (пустой) в main
  renderTemplate(sectionMain, getFilmSectionTemplate?.(), RenderPosition.BEFOREEND);
  const filmSection = sectionMain.querySelector('.films');

  //Добавление контейнера в секцию фильмов для подготовки отображения основного перечня карточек фильмов
  renderTemplate(filmSection, getFilmListSectionTemplate?.(SectionMessages.DEFAULT), RenderPosition.BEFOREEND);
  const filmMainListSection = sectionMain.querySelector('.films-list__container');

  //Добавление контейнера в секцию фильмов для подготовки отображения карточек фильмов с самым высоким рейтингом
  let filmRatedListSection = '';
  if (filmsTopRated.length >= FILM_EXTRA_QUANTITY) {
    renderTemplate(filmSection, getFilmListSectionTemplate?.(SectionMessages.RATED, FILM_EXTRA_SECTION), RenderPosition.BEFOREEND);
    filmRatedListSection = filmSection.querySelector('.films-list--extra:last-child .films-list__container');
  }

  //Добавление контейнера в секцию фильмов для подготовки отображения карточек самых комментируемых фильмов
  let filmPopularListSection = '';
  if (filmsTopCommented.length >= FILM_EXTRA_QUANTITY) {
    renderTemplate(filmSection, getFilmListSectionTemplate?.(SectionMessages.POPULAR, FILM_EXTRA_SECTION), RenderPosition.BEFOREEND);
    filmPopularListSection = filmSection.querySelector('.films-list--extra:last-child .films-list__container');
  }

  //Отображение основных карточек фильмов
  renderCardsHeapTemplate(0, shownFilmQuantity, () => renderTemplate(filmMainListSection, getFilmCardTemplate?.(filmsData[i]), RenderPosition.BEFOREEND));

  //Отображение фильмов с самым высоким рейтингом
  if (filmRatedListSection) {
    renderCardsHeapTemplate(0, FILM_EXTRA_QUANTITY, () => renderTemplate(filmRatedListSection, getFilmCardTemplate?.(filmsTopRated[i]), RenderPosition.BEFOREEND));
  }

  //Отображение самых комментируемых фильмов
  if (filmPopularListSection) {
    renderCardsHeapTemplate(0, FILM_EXTRA_QUANTITY, () => renderTemplate(filmPopularListSection, getFilmCardTemplate?.(filmsTopCommented[i]), RenderPosition.BEFOREEND));
  }

  //Добавление кнопки Show More
  renderTemplate(filmMainListSection, getShowMoreButtonTemplate?.(), RenderPosition.AFTEREND);
  const showMoreButton = filmMainListSection.querySelector('.films-list__show-more');

  const onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    renderCardsHeapTemplate(0, 0, () => renderTemplate(filmMainListSection, getFilmCardTemplate?.(filmsData[i]), RenderPosition.BEFOREEND));
  };

  showMoreButton.addEventListener('click', onShowMoreButtonClick);

} else {
  //Фильмов нет, отображение соответствующего сообщения
  renderTemplate(sectionMain, getFilmSectionEmptyTemplate?.(SectionMessages.NO_MOVIES), RenderPosition.BEFOREEND);
}
renderTemplate(footerStatistic, getFilmFooterTemplate?.(filmStatistics), RenderPosition.BEFOREEND);

//Отображение popup фильма
//renderTemplate(sectionMain, getPopupTemplate?.(), RenderPosition.BEFOREEND);
