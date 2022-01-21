import AbstractView from './abstract-view.js';
import { FilterTypes } from '../const.js';

const ACTIVE_CLASS = 'main-navigation__item--active';

const getFilterMenuTemplate = (filmsStatistic = {}, filterType) => {
  const {
    watchlist = 0,
    watched = 0,
    favorite = 0,
  } = filmsStatistic;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${(filterType === FilterTypes.ALL ? ACTIVE_CLASS : '')}" data-filter-type=${FilterTypes.ALL}>All movies</a>
        <a href="#watchlist" class="main-navigation__item ${(filterType === FilterTypes.WATCHLIST ? ACTIVE_CLASS : '')}" data-filter-type=${FilterTypes.WATCHLIST}>Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${(filterType === FilterTypes.WATCHED ? ACTIVE_CLASS : '')}" data-filter-type=${FilterTypes.WATCHED}>History <span class="main-navigation__item-count">${watched}</span></a>
        <a href="#favorites" class="main-navigation__item ${(filterType === FilterTypes.FAVORITE ? ACTIVE_CLASS : '')}" data-filter-type=${FilterTypes.FAVORITE}>Favorites <span class="main-navigation__item-count">${favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional ${(filterType === FilterTypes.STATS ? ACTIVE_CLASS : '')}" data-filter-type=${FilterTypes.STATS}>Stats</a>
    </nav>`
  );
};

class FilterMenuView extends AbstractView {
  #filmsStatistic = {};
  #filterType = FilterTypes.ALL;
  constructor(filmsStatistic, filterType) {
    super();
    this.#filmsStatistic = filmsStatistic;
    this.#filterType = filterType;
  }

  get template() {
    return getFilterMenuTemplate(this.#filmsStatistic, this.#filterType);
  }

  #setActiveAnchor = (evt) => {
    this.element.querySelectorAll('a').forEach((anchor) => {
      if ((anchor === evt.target) || (anchor === evt.target.closest('a'))) {
        anchor.classList.add(ACTIVE_CLASS);
      } else {
        anchor.classList.remove(ACTIVE_CLASS);
      }
    });
  }

  setFilterMenuClickHandler = (callback) => {
    this.createEventListener(this.element, 'click', (evt) => {
      this.#setActiveAnchor(evt);
      callback(evt.target.dataset.filterType);
    });
  }
}

export { FilterMenuView as default };
