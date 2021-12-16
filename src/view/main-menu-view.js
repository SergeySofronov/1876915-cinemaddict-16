import AbstractView from './abstract-view';

const getMainMenuTemplate = (filmFilter = {}) => {
  const {
    watchlist = 0,
    watched = 0,
    favorite = 0,
  } = filmFilter;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class MainMenuView extends AbstractView {
  #filmFilter = {};
  constructor(filmFilter) {
    super();
    this.#filmFilter = filmFilter;
  }

  get template() {
    return getMainMenuTemplate(this.#filmFilter);
  }
}

export { MainMenuView as default };
