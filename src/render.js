const MAX_CHILDREN_VALUE = 1;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;

    default: break;
  }
};

const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = (typeof (template) === 'string') ? template.trim() : '';
  if (element.children.length > MAX_CHILDREN_VALUE) {
    return element;
  }

  return element.firstChild;
};

const getRenderPosition = () => RenderPosition;

export { render, createElement, getRenderPosition };
