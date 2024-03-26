const initialCards = [
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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileModalName = profileEditModal.querySelector("#profile-title-input");
const profileModalDescription = profileEditModal.querySelector(
  "#profile-description-input"
);

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardModal = document.querySelector("#card-modal");
const cardEditForm = cardModal.querySelector(".modal__form");
const cardCloseButton = cardModal.querySelector(".modal__close");
const cardModalTitle = cardModal.querySelector("#card-title-input");
const cardModalUrl = cardModal.querySelector("#card-url-input");
const cardAddButton = document.querySelector(".profile__add-button");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openProfileModal() {
  profileEditModal.classList.add("modal_opened");
  profileModalName.value = profileTitle.textContent;
  profileModalDescription.value = profileDescription.textContent;
}

function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}

function saveProfileModalInput(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeProfileModal();
}

function openCardModal() {
  cardModal.classList.add("modal_opened");
  cardModalTitle.value = profileTitle.textContent;
  cardModalUrl.value = profileDescription.textContent;
}

function closeCardModal() {
  cardModal.classList.remove("modal_opened");
}

function saveCardModalInput(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeCardModal();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", openProfileModal);
profileCloseButton.addEventListener("click", closeProfileModal);
profileEditForm.addEventListener("submit", saveProfileModalInput);

cardAddButton.addEventListener("click", openCardModal);
cardCloseButton.addEventListener("click", closeCardModal);
cardEditForm.addEventListener("submit", saveCardModalInput);

/* -------------------------------------------------------------------------- */
/*                                  For Loops                                  */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
