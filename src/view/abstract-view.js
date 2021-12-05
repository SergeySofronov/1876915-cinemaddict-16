import { createElement } from '../render';

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
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template()');
  }

  removeElement() {
    this.#element?.remove();
    this.#element = null;
    this.#eventInfo = null;
  }

  createEventHandler(context, fn) {
    return function (evt) {
      evt.preventDefault();
      return fn.call(context, evt);
    };
  }

  createEventListener(selector, eventType, callback) {
    if (!this.#eventInfo) {
      this.#eventInfo = new Map();
    }

    const elementSelector = (selector instanceof Element) ? selector : this.element.querySelector(selector);

    if (!(elementSelector instanceof Element)) {
      throw new Error('Unable to create event listener for non DOM Element');
    }

    if (typeof (callback) !== 'function') {
      throw new Error('Argument "handler" is not a function');
    }

    const eventHandler = this.createEventHandler(this, callback);
    const isHasSimilar = [...this.#eventInfo.entries()]
      .some(([key, [, handler]]) => ((key === elementSelector) || (handler === eventHandler)));

    if (!isHasSimilar) {
      this.#eventInfo.set(elementSelector, [eventType, eventHandler]);
      elementSelector.addEventListener(eventType, eventHandler);
    }
  }

  removeEventListener(selector) {
    const elementSelector = this.#element?.querySelector(selector);
    if (this.#eventInfo?.has(elementSelector)) {
      const [eventType, eventHandler] = this.#eventInfo.get(elementSelector);
      elementSelector.removeEventListener(eventType, eventHandler);
    }
  }

}

export { AbstractView as default };
