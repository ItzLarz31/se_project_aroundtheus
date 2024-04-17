import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";

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

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleImageClick(name, link) {
  openModal(previewImageModal);
  imageName.textContent = name;
  imageName.alt = name;
  imageEl.src = link;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("click", closeModalOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("click", closeModalOverlay);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeModal(profileEditModal);
  editProfileFormValidator.resetValidation();
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

cardData.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardModalTitle.value;
  const link = cardModalUrl.value;
  evt.target.reset();
  renderCard({ name, link }, cardsWrap);
  closeModal(cardModal);
  addCardFormValidator.resetValidation();
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

// Profile Modal
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileModalName.value = profileTitle.textContent;
  profileModalDescription.value = profileDescription.textContent;
});
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Card Modal
cardAddButton.addEventListener("click", () => openModal(cardModal));
cardEditForm.addEventListener("submit", handleCardFormSubmit);

/* -------------------------------------------------------------------------- */
/*                                  For Loops                                  */
/* -------------------------------------------------------------------------- */

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
