import Popup from "./Popup.js";

export default class PopUpImage extends Popup {
  constructor({ popupSelector }) {
    super();
    this._popupForm = this._popupElement.querySelector(".image-modal");
  }

  close() {
    super();
  }
}
