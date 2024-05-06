export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._borderErrorClass = config.borderErrorClass;

    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._borderErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    errorElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._borderErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    errorElement.classList.remove(this._inputErrorClass);
  }

  _toggleButtonState(inputElements, submitButton) {
    if (this._hasInvalidInput(inputElements)) {
      this._disableButton(submitButton);
    } else {
      this._enableButton(submitButton);
    }
  }

  _hasInvalidInput(inputList) {
    return [...this._inputElements].some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
