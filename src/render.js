import AbstractView from './view/abstract-view';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, component, place) => {

  const parent = container instanceof AbstractView ? container.element : container;
  const child = component instanceof AbstractView ? component.element : component;

  if ((parent instanceof Element) && (child instanceof Element)) {
    switch (place) {
      case RenderPosition.BEFOREBEGIN:
        parent.before(child);
        break;
      case RenderPosition.AFTERBEGIN:
        parent.prepend(child);
        break;
      case RenderPosition.BEFOREEND:
        parent.append(child);
        break;
      case RenderPosition.AFTEREND:
        parent.after(child);
        break;

      default: break;
    }
  } else{
    throw new Error('Container or component aren\'t instance of Element');
  }
};

const replace = (oldElement, newElement) => {
  if (!(oldElement && newElement)) {
    throw new Error('Can\'t replace non-existing elements');
  }

  const oldInstance = oldElement instanceof AbstractView ? oldElement.element : oldElement;
  const newInstance = newElement instanceof AbstractView ? newElement.element : newElement;

  if (!((oldInstance instanceof Element) && (newInstance instanceof Element))) {
    throw new Error('Can\'t replace non-Element instance');
  }

  oldInstance.replaceWith(newInstance);
};

export { render, replace, RenderPosition };
