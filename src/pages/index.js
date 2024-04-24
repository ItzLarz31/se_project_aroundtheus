import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import profileSrc from "../images/jacques-cousteau.jpg";
import { validatorConfigs } from "../utils/constants.js";
import { cardData } from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

// Content
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const cardsWrap = document.querySelector(".cards__list");

//Profile Modal
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
const cardAddButton = document.querySelector(".profile__add-button");

const addCardFormValidator = new FormValidator(validatorConfigs, cardEditForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  validatorConfigs,
  profileEditForm
);
editProfileFormValidator.enableValidation();

const newCardPopup = new PopupWithForm("#card-modal", handleCardFormSubmit);
newCardPopup.setEventListeners();

const newImagePopup = new PopupWithImage("#image-modal");
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

const profileImage = document.getElementById("profile-image");
profileImage.src = profileSrc;
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

function handleCardFormSubmit({ title, url }) {
  renderCard({ name: title, link: url }, cardsWrap);
  addCardFormValidator.resetValidation();
  newCardPopup.close();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

// Profile Edit Button
profileEditButton.addEventListener("click", () => {
  newProfilePopup.open();
  const { name, description } = userInfo.getUserInfo();
  profileModalName.value = name;
  profileModalDescription.value = description;
});

// Card Add Button
cardAddButton.addEventListener("click", () => newCardPopup.open());
