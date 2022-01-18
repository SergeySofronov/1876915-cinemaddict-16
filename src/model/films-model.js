import AbstractObservable from './abstract-observable.js';

class FilmsModel extends AbstractObservable {
  #filmsData = [];

  set filmsData(films) {
    this.#filmsData = [...films];
  }

  get filmsData() {
    return this.#filmsData;
  }

  update = (updateType, updateData) => {

    const index = this.#filmsData.findIndex((film) => film.id === updateData?.id);

    if (index === -1) {
      throw new Error('Can\'t update non existing film');
    }

    this.#filmsData = [
      ...this.#filmsData.slice(0, index),
      updateData,
      ...this.#filmsData.slice(index + 1),
    ];

    this._notify(updateType, updateData);
  };
}

export { FilmsModel as default };
