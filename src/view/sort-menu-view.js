import AbstractView from './abstract-view';
import { SortType } from '../const.js';

const getFilmSortMenuTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type = ${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.RATE}>Sort by rating</a></li>
  </ul>`
);

class SortMenuView extends AbstractView {
  get template() {
    return getFilmSortMenuTemplate();
  }

  #setActiveAnchor = (evt) => {
    this.element.querySelectorAll('a').forEach((anchor) => {
      if (anchor === evt.target) {
        anchor.classList.add('sort__button--active');
      } else {
        anchor.classList.remove('sort__button--active');
      }
    });
  }


  setSortClickHandler(callback) {
    this.createEventListener(this.element, 'click', (evt) => {
      this.#setActiveAnchor(evt);
      callback(evt);
    });

    return this.element;
  }
}

export { SortMenuView as default };
