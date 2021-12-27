
class AbstractView {
  #element = null;
  #eventInfo = null;
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, class instance only');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = this.createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template()');
  }

  createElement = (template) => {
    if (typeof (template) === 'string') {
      const element = document.createElement('div');
      element.innerHTML = template;

      if (element.firstElementChild === element.lastElementChild) {

        return element.firstElementChild;
      }

      throw new Error('Can\'t create component from several sibling elements');
    }

    return null;
  };

  removeElement = () => {
    this.#element?.remove();
    this.#element = null;
    this.#eventInfo = null;
  }

  createEventListener = (selector, eventType, callback) => {
    if (!this.#eventInfo) {
      this.#eventInfo = new Map();
    }

    const elementSelector = (selector instanceof Element) ? selector : this.element.querySelector(selector);

    if (!(elementSelector instanceof Element)) {
      throw new Error('Unable to create event listener for non DOM Element');
    }

    if (typeof (callback) !== 'function') {
      throw new Error('Argument "callback" is not a function');
    }

    const eventHandler = (evt) => {
      evt.preventDefault();
      callback(evt);
    };

    const isHasSimilar = [...this.#eventInfo.entries()]
      .some(([key, [, handler]]) => ((key === elementSelector) || (handler === eventHandler)));

    if (!isHasSimilar) {
      this.#eventInfo.set(elementSelector, [eventType, eventHandler]);
      elementSelector.addEventListener(eventType, eventHandler);
    }
  }
}

export { AbstractView as default };
