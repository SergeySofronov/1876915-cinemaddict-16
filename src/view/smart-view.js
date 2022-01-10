import AbstractView from './abstract-view.js';

class SmartView extends AbstractView {
  #data = {};

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  updateData = (update) => (this.#data = { ...this.#data, ...update });

  updateElement = (update) => {
    this.updateData(update);
    const prevElement = this.element;
    const scrollPosition = (prevElement.scrollTop || 0);
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = scrollPosition;

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  static parseData = (filmData) => ({
    ...filmData, changedComments: [...filmData.comments],
    watchlist: filmData.userDetails.watchlist,
    watched: filmData.userDetails.watched,
    favorite: filmData.userDetails.favorite
  });

  static restoreData = (data) => {
    const filmData = { ...data };
    filmData.comments = data.changedComments;
    filmData.userDetails.watchlist = data.watchlist;
    filmData.userDetails.watched = data.watched;
    filmData.userDetails.favorite = data.favorite;
    delete filmData.watchlist;
    delete filmData.watched;
    delete filmData.favorite;
    delete filmData.changedComments;
    delete filmData.userComment;
    delete filmData.userEmoji;

    return filmData;
  }
}

export { SmartView as default };
