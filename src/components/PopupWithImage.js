import Popup from "./Popup.js";

export default class PopUpImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupTitle = this._popupElement.querySelector(".modal__image-name");
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    super.open();
  }

  close() {
    super.close();
  }
}
