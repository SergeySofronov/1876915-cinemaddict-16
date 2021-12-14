import AbstractView from './abstract-view';

const getFilmSortMenuTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

class SortMenuView extends AbstractView {
  get template() {
    return getFilmSortMenuTemplate();
  }
}

export { SortMenuView as default };
