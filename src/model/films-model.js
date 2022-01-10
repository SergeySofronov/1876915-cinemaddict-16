import AbstractObservable from './abstract-observable.js';

class FilmsModel extends AbstractObservable {
  #filmsData = [];

  set filmsData(films) {
    this.#filmsData = [...films];
  }

  get filmsData() {
    return this.#filmsData;
  }
}

export {FilmsModel as default};
