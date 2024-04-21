export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement.addEventListener("keydown", closeModalEscape);
    this._popupElement.addEventListener("click", closeModalOverlay);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("keydown", closeModalEscape);
    this._popupElement.removeEventListener("click", closeModalOverlay);
  }

  _handleEscClose() {}

  seteventListeners() {
    //sets event listeners
  }
}
