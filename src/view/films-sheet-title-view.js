import AbstractView from './abstract-view.js';
import { SectionMessages, FilterTypes } from '../const.js';

const TitleTypes = {
  [SectionMessages.DEFAULT]: 'All movies. Upcoming',
  [SectionMessages.RATED]: 'Top rated',
  [SectionMessages.POPULAR]: 'Most commented',
  [FilterTypes.ALL]: 'There are no movies in our database',
  [FilterTypes.WATCHLIST]: 'There are no movies to watch now',
  [FilterTypes.WATCHED]: 'There are no watched movies now',
  [FilterTypes.FAVORITE]: 'There are no favorite movies now',
};

const getSheetTitleTemplate = (messageType) => (
  `<h2 class="films-list__title ${messageType === SectionMessages.DEFAULT ? 'visually-hidden' : ''}">
  ${TitleTypes[messageType]}
  </h2>`
);

class FilmsSheetTitleView extends AbstractView {
  #messageType = null;
  constructor(messageType) {
    super();
    this.#messageType = messageType;
  }

  get messageType(){
    return this.#messageType;
  }

  get template() {
    return getSheetTitleTemplate(this.#messageType);
  }
}

export { FilmsSheetTitleView as default };
