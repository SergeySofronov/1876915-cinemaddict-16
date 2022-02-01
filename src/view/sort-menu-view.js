import AbstractView from './abstract-view';
import { SortTypes } from '../const.js';

const ACTIVE_CLASS = 'sort__button--active';

const getFilmSortMenuTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type = ${SortTypes.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortTypes.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortTypes.RATE}>Sort by rating</a></li>
  </ul>`
);

class SortMenuView extends AbstractView {
  #activeSortType = SortTypes.DEFAULT;

  get sortType() {
    return this.#activeSortType;
  }

  get template() {
    return getFilmSortMenuTemplate();
  }

  #setActiveAnchor = (evt) => {
    this.element.querySelectorAll('A').forEach((anchor) => {
      if (anchor === evt.target) {
        anchor.classList.add(ACTIVE_CLASS);
        this.#activeSortType = evt.target.dataset.sortType;
      } else {
        anchor.classList.remove(ACTIVE_CLASS);
      }
    });
  }


  setSortClickHandler(callback) {
    this.createEventListener(this.element, 'click', (evt) => {
      if (evt.target.tagName === 'A') {
        this.#setActiveAnchor(evt);
        callback(evt);
      }
    });

    return this.element;
  }
}

export { SortMenuView as default };
