import AbstractView from '../view/abstract-view.js';
import AbstractObservable from '../model/abstract-observable.js';
import FilterMenuView from '../view/filter-menu-view.js';
import { replace, render, RenderPosition } from '../render.js';
import { filterFunctions } from '../filter.js';
import { FilterTypes, UpdateTypes } from '../const.js';

class FilterMenuPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    if (!((filterContainer instanceof AbstractView) || (filterContainer instanceof Element))) {
      throw new Error('Can\'t create instance of FilterPresenter while filterContainer is not an Element or instance of AbstractView');
    }

    for (let i = 1; i < arguments.length; i++) {
      if (!(arguments[i] instanceof AbstractObservable)) {
        throw new Error(`Can\\'t create instance of FilterPresenter while argument${i - 1} is not an instance of AbstractObservable`);
      }
    }

    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    //todo: проверить, что не нужно
    //this.#filterModel.addObserver(this.#onFilterMenuClick);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  #getStatistic = () => ({
    watchlist: filterFunctions[FilterTypes.WATCHLIST](this.#filmsModel.filmsData).length,
    watched: filterFunctions[FilterTypes.WATCHED](this.#filmsModel.filmsData).length,
    favorite: filterFunctions[FilterTypes.FAVORITE](this.#filmsModel.filmsData).length,
  });


  init = () => {


    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterMenuView(this.#getStatistic(), this.#filterModel.filterType);
    this.#filterComponent.setFilterMenuClickHandler(this.#onFilterMenuClick);

    if (prevFilterComponent) {
      replace(prevFilterComponent, this.#filterComponent);
      prevFilterComponent.removeElement();

      return;
    }

    render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #onFilterMenuClick = (filterType) => {
    if (this.#filterModel.filterType === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  }

}

export { FilterMenuPresenter as default };
