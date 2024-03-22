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
const editButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const modal = document.querySelector(".modal");
const modalForm = modal.querySelector(".modal__form");
const closeButton = modal.querySelector(".modal__close");
const modalName = modal.querySelector("#profile-title-input");
const modalDescription = modal.querySelector("#profile-description-input");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function editButtonClicked() {
  modal.classList.add("modal_opened");
  modalName.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

function closeButtonClicked() {
  modal.classList.remove("modal_opened");
}

function saveButtonClicked(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  closeButtonClicked();
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

editButton.addEventListener("click", editButtonClicked);
closeButton.addEventListener("click", closeButtonClicked);
modalForm.addEventListener("submit", saveButtonClicked);

/* -------------------------------------------------------------------------- */
/*                                  For Loops                                  */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
