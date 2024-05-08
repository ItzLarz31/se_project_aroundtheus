import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(".modal__save");
    this._handleSubmitCallback = null;
  }

  setSubmitAction(callback) {
    this._handleSubmitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this._handleSubmitCallback();
    });
  }
}
