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
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirmation.js";

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

//Avatar
const avatarEditModal = document.querySelector("#profile-avatar-modal");
const avatarEditForm = avatarEditModal.querySelector(".modal__form");
const avatarEditButton = document.querySelector(
  ".profile__edit-picture-button"
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

const editAvatarFormValidator = new FormValidator(
  validatorConfigs,
  avatarEditForm
);
editAvatarFormValidator.enableValidation();

const newCardPopup = new PopupWithForm(
  "#card-modal",
  handleCardFormSubmit,
  "Create"
);
newCardPopup.setEventListeners();

const newImagePopup = new PopupWithImage("#image-modal");
newImagePopup.setEventListeners();

const newProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit,
  "Save"
);
newProfilePopup.setEventListeners();

const newAvatarPopup = new PopupWithForm(
  "#profile-avatar-modal",
  handleAvatarFormSubmit,
  "Save"
);
newAvatarPopup.setEventListeners();

const newPopupConfirm = new PopupWithConfirm("#confirm-modal");
newPopupConfirm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

const profileImage = document.getElementById("profile-image");
profileImage.src = profileSrc;

/* ---------------------------------------- API --------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f280bef9-8cb1-42f0-967f-b248aa62ce9e",
    "Content-Type": "application/json",
  },
});

let cardSection;
api
  .getInitialCards()
  .then((cardData) => {
    cardSection = new Section(
      {
        items: cardData,
        renderer: renderCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getProfileInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setAvatarImage({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleImageClick(name, link) {
  newImagePopup.open({ link, name });
}

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

function handleDeleteClick(card) {
  newPopupConfirm.open();
  newPopupConfirm.setSubmitAction(() => {
    api.deleteCard(card.id).then(() => {
      card.deleteCard();
      newPopupConfirm.close();
    });
  });
}

function handleLikeClick(card) {
  if (!card.isLiked) {
    api.likeCard(card.id).then(() => {
      card.updateLikes(true);
    });
  } else {
    api.dislikeCard(card.id).then(() => {
      card.updateLikes(false);
    });
  }
}

function handleProfileFormSubmit({ name, description }) {
  newProfilePopup.renderLoading(true);
  api
    .updateProfileInfo({ title: name, description })
    .then(() => {
      userInfo.setUserInfo({ name, description });
      editProfileFormValidator.disableButton();
      newProfilePopup.close();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      editProfileFormValidator.resetValidation();
    })
    .finally(() => {
      newProfilePopup.renderLoading(false);
    });
}

function handleCardFormSubmit({ title, url }) {
  newCardPopup.renderLoading(true);
  api
    .addCard({ name: title, link: url })
    .then((newCardData) => {
      renderCard(newCardData);
      newCardPopup.close();
      newCardPopup.reset();
      addCardFormValidator.disableButton();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
      addCardFormValidator.resetValidation();
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}

function handleAvatarFormSubmit(data) {
  newAvatarPopup.renderLoading(true);
  const url = data.url;
  api
    .updateAvatar({ avatar: url })
    .then(() => {
      userInfo.setAvatarImage({ avatar: url });
      editAvatarFormValidator.disableButton();
      newAvatarPopup.close();
      newAvatarPopup.reset();
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
      editAvatarFormValidator.resetValidation();
    })
    .finally(() => {
      newAvatarPopup.renderLoading(false);
    });
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

// Avatar Edit Button
avatarEditButton.addEventListener("click", () => newAvatarPopup.open());

//Delete card button
newPopupConfirm.setSubmitAction((cardId) => {
  handleDeleteConfirmation(cardId);
  newPopupConfirm.close();
});
