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

// const remove = (component) => {
//   if (component) {
//     if (!(component instanceof AbstractView)) {
//       throw new Error('Can remove only components');
//     }

//     component.element?.remove(); //todo: move into removeElement?
//     component.removeElement();//todo: move removeElement into AbstractView?
//   }
// };

//todo: move createElement into AbstractView?
const createElement = (template) => {
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

const getRenderPosition = () => RenderPosition;

export { render, replace, createElement, getRenderPosition };
