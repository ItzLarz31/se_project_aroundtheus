export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    //".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    //setting event listener on card image
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();
    return this._cardElement;
  }
}

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "f280bef9-8cb1-42f0-967f-b248aa62ce9e",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
