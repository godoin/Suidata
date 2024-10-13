/**
 * Event Handlers
 */


const attachEventHandlerById = (
  elementId,
  eventType,
  handlerFunction,
  ...args
) => {
  const element = document.getElementById(elementId);
  element?.addEventListener(eventType, (event) => {
    handlerFunction(event, ...args);
  });
};

const attachMultipleEventHandlerBySelectorAll = (
  elementId,
  eventType,
  handlerFunction,
  ...args
) => {
  const allElements = document.querySelectorAll(elementId);
  allElements?.forEach((element) => {
    element?.addEventListener(eventType, (e) => {
      handlerFunction(e, element, ...args);
    });
  });
};

const attachMultipleClickHandler = (selector, handlerFunction) => {
  const allSelectors = document.querySelectorAll(selector);

  allSelectors?.forEach((selector) => {
    selector.addEventListener("click", () => {
      handlerFunction(selector);
    });
  });
};

const attachMultipleClickHandlerWithParent = (
  selector,
  role,
  handlerFunction
) => {
  const parent = document.getElementById(selector);
  const elements = parent?.querySelectorAll(role);

  elements?.forEach((element) => {
    element.addEventListener("click", () => {
      handlerFunction(element, parent);
    });
  });
};

/**
 * Attaches a submit event handler (usually a form) given a id.
 */
const attachSubmitHandler = (formId, handlerFunction) => {
  const form = document.getElementById(formId);
  form?.addEventListener("submit", handlerFunction);
};

export {
  attachEventHandlerById,
  attachMultipleClickHandler,
  attachMultipleClickHandlerWithParent,
  attachMultipleEventHandlerBySelectorAll,
  attachSubmitHandler,
};