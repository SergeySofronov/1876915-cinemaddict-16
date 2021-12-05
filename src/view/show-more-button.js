import AbstractView from './abstract-view';

const getShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

class ShowMoreButtonView extends AbstractView {

  get template() {
    return getShowMoreButtonTemplate();
  }

  setButtonClickHandler(callback) {
    this.createEventListener(this.element, 'click', callback);

    return this.element;
  }

  removeButtonClickHandler() {
    this.removeEventListener(this.element);

    return this.element;
  }
}

export { ShowMoreButtonView as default };
