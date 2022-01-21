import AbstractObservable from './abstract-observable';
import { FilterTypes } from '../const';

class FilterModel extends AbstractObservable {
  #filterType = FilterTypes.ALL;

  get filterType() {
    return this.#filterType;
  }

  setFilter = (updateType, filterType) => {
    this.#filterType = filterType;
    this._notify(updateType, filterType);
  }
}

export { FilterModel as default };
