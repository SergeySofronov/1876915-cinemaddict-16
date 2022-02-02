import { EventStates } from '../const.js';

const SHAKE_ANIMATION_TIMEOUT = 600;
const SECONDS_DIVIDER = 1000;

class AbstractView {
  #element = null;
  #eventInfo = new Map();
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

  #getElementSelector = (selector) => {
    const elementSelector = (selector instanceof Element) ? selector : this.element?.querySelector(selector);
    if (!(elementSelector instanceof Element)) {
      throw new Error('Unable to create/remove event listener for non DOM Element');
    }
    return elementSelector;
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
    this.removeAllEventListeners();
    this.#element = null;
  }

  destroyElement = () => {
    if (!this.#element) {
      return;
    }

    this.#element.remove();
    this.removeElement();
  }

  createEventListener = (selector, eventType, callback, isPreventDefault = EventStates.PREVENT_DEFAULT) => {

    const elementSelector = this.#getElementSelector(selector);

    if (typeof (callback) !== 'function') {
      throw new Error('Argument "callback" is not a function');
    }

    const eventHandler = (evt) => {
      if (isPreventDefault) {
        evt.preventDefault();
      }
      callback(evt);
    };

    const isHasSimilar = [...this.#eventInfo.entries()]
      .some(([key, [, handler]]) => ((key === elementSelector) || (handler === eventHandler)));

    if (!isHasSimilar) {
      this.#eventInfo.set(elementSelector, [eventType, eventHandler]);
      elementSelector.addEventListener(eventType, eventHandler);
    }
  }

  removeAllEventListeners = () => {
    for (const [elementSelector, [eventType, eventHandler]] of this.#eventInfo.entries()) {
      elementSelector.removeEventListener(eventType, eventHandler);
    }
    this.#eventInfo.clear();
  }

  shake = (selector, callback) => {
    const element = this.#getElementSelector(selector);
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SECONDS_DIVIDER}s`;
    setTimeout(() => {
      element.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

}

export { AbstractView as default };
