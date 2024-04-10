// enabling validation by calling enableValidation()
// pass all the settings on call

const config = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  borderErrorClass: "modal__input_border_error",
};

function showInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass, borderErrorClass }
) {
  const errorMessageElement = formElements.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.add(borderErrorClass);
  errorMessageElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElements.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass, borderErrorClass }
) {
  const errorMessageElement = formElements.querySelector(
    `#${inputElements.id}-error`
  );
  inputElements.classList.remove(borderErrorClass);
  errorMessageElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = " ";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElements, inputElements, config) {
  if (!inputElements.validity.valid) {
    return showInputError(formElements, inputElements, config);
  }
  hideInputError(formElements, inputElements, config);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElements) => inputElements.validity.valid);
}

function disableButton() {}

function enableButton() {}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElements, config) {
  const { inputSelector } = config;
  const inputElements = [...formElements.querySelectorAll(inputSelector)];
  const submitButton = formElements.querySelector(".modal__save");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElements, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formElements = [...document.querySelectorAll(config.formSelector)];
  formElements.forEach((formElements) => {
    formElements.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElements, config);
    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    //
    // if input is not valid
    // grab validation message
    // add error class to input
    // display error message
    // disable save button
    //
    // if all inputs are valid
    //enable button
    //reset error messages
  });
}

enableValidation(config);
