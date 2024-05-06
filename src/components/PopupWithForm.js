import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, defaultSubmitButtonText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._defaultSubmitButtonText = defaultSubmitButtonText;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _renderSaving(isSaving) {
    const submitButton = this._popupForm.querySelector(".modal__save");
    if (isSaving) {
      submitButton.textContent = "Saving...";
    } else {
      submitButton.textContent = this._defaultSubmitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderSaving(true);
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
      this._renderSaving(false);
      this.close();
    });
  }
}
