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

// Content
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");

//Profile Modal
const profileDescription = content.querySelector(".profile__description");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileModalName = profileEditModal.querySelector("#profile-title-input");
const profileModalDescription = profileEditModal.querySelector(
  "#profile-description-input"
);

// Card List
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Card Modal
const cardModal = document.querySelector("#card-modal");
const cardEditForm = cardModal.querySelector(".modal__form");
const cardCloseButton = cardModal.querySelector(".modal__close");
const cardModalTitle = cardModal.querySelector("#card-title-input");
const cardModalUrl = cardModal.querySelector("#card-url-input");
const cardAddButton = document.querySelector(".profile__add-button");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function saveProfileModalInput(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeModal(profileEditModal);
}

// function saveCardModalInput(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileModalName.value;
//   profileDescription.textContent = profileModalDescription.value;
//   closeCardModal();
// }

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

// Profile Modal
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileModalName.value = profileTitle.textContent;
  profileModalDescription.value = profileDescription.textContent;
});
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", saveProfileModalInput);

// Card Modal
cardAddButton.addEventListener("click", () => openModal(cardModal));
cardCloseButton.addEventListener("click", () => closeModal(cardModal));
// cardEditForm.addEventListener("submit", saveCardModalInput);

/* -------------------------------------------------------------------------- */
/*                                  For Loops                                  */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
