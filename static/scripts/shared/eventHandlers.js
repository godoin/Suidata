/**
 * Event Handlers
 */

export function attachClickHandlerById(selectorId, clickHandler) {
  const element = document.getElementById(selectorId);
  element?.addEventListener("click", clickHandler);
}

export function attachSubmitHandlerById(formId, submitHandler) {
  const form = document.getElementById(formId);
  form?.addEventListener("submit", submitHandler);
}

export function attachInputHandlerById(selectorId, inputHandler) {
  const element = document.getElementById(selectorId);

  element?.addEventListener("input", inputHandler);
}
