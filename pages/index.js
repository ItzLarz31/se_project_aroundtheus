import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const cardData = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const validatorConfigs = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  borderErrorClass: "modal__input_border_error",
};
// validatorConfigs.forEach((config) => {
//   const formElements = document.querySelectorAll(config.formSelector);
//   formElements.forEach((formElement) => new FormValidator(config, formElement));
// });

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

// Content
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const cardsWrap = document.querySelector(".cards__list");
const closeButtons = document.querySelectorAll(".modal__close");

//Profile Modal
const profileDescription = content.querySelector(".profile__description");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileModalName = profileEditModal.querySelector("#profile-title-input");
const profileModalDescription = profileEditModal.querySelector(
  "#profile-description-input"
);

// Cards
const cardListEl = document.querySelector(".cards__list");

// Card Modal
const cardModal = document.querySelector("#card-modal");
const cardEditForm = cardModal.querySelector(".modal__form");
const cardModalTitle = cardModal.querySelector("#card-title-input");
const cardModalUrl = cardModal.querySelector("#card-url-input");
const cardAddButton = document.querySelector(".profile__add-button");

// Preview Image Modal
const previewImageModal = document.querySelector("#image-modal");
const imageEl = previewImageModal.querySelector(".modal__image");
const imageName = previewImageModal.querySelector(".modal__image-name");

const addCardFormValidator = new FormValidator(validatorConfigs, cardEditForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  validatorConfigs,
  profileEditForm
);
editProfileFormValidator.enableValidation();

const newCardPopup = new PopupWithForm("#card-modal", handleCardFormSubmit);
newCardPopup.setEventListeners();

const newImagePopup = new PopUpImage("#image-modal");
newImagePopup.setEventListeners();

const newProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
newProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const userData = userInfo.getUserInfo();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleImageClick(name, link) {
  newImagePopup.open({ link, name });
}

const cardSection = new Section(
  {
    items: cardData,
    renderer: renderCard,
  },
  ".cards__list"
);

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

cardSection.renderItems();

function handleProfileFormSubmit({ name, description }) {
  userInfo.setUserInfo({ name, description });
  newProfilePopup.close();
}

function handleCardFormSubmit() {
  const name = newCardPopup._getInputValues().title;
  const link = newCardPopup._getInputValues().url;
  renderCard({ name, link }, cardsWrap);
  newCardPopup.close();
  addCardFormValidator.resetValidation();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

// Profile Edit Button
profileEditButton.addEventListener("click", () => {
  newProfilePopup.open();
  profileModalName.value = userData.name;
  profileModalDescription.value = userData.description;
});

// Card Add Button
cardAddButton.addEventListener("click", () => newCardPopup.open());
