export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteConfirmation,
    handleLikeCard
  ) {
    this._name = name;
    this._link = link;
    this.id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._handleLikeCard = handleLikeCard;
    this.isLiked = isLiked;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this);
    });

    //".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteConfirmation(this);
    });

    //setting event listener on card image
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeButton() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteButton() {
    this._handleDeletePopup.open(this.id);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikes(isLiked) {
    this.isLiked = isLiked;
    this._handleLikeButton();
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
    this._handleLikeButton();

    this._setEventListeners();
    return this._cardElement;
  }
}
