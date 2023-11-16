import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

/* Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditCloseButton = profileEditModal.querySelector("#modal-close");
const addCardModalCloseButton = addCardModal.querySelector("#modal-card-close");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileEditForm = profileEditModal.querySelector("#modal-form");
const cardWrap = document.querySelector("#cards");
const addCardFormElement = addCardModal.querySelector("#add-card-form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector("#profile__button");
const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");

const cardPreviewImage = document.querySelector("#modal-preview-image");
const cardCaption = document.querySelector("#modal-caption");
const cardPreviewModal = document.querySelector("#cardPreviewModal");
const cardPreviewCloseButton = cardPreviewModal.querySelector(
  "#card-preview-close-button"
);

/* Functions */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  profileEditFormValidator.resetValidation();
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");

    closeModal(openedModal);
  }
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal__wrapper")
  ) {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handlePreviewImage(cardData) {
  cardPreviewImage.src = cardData.link;
  cardPreviewImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  openModal(cardPreviewModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewImage);
  return card.getCardElement();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  //
  const cardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  //renderCard({ name, link }, cardListEl);
  const cardElement = createCard(cardData);
  cardWrap.prepend(cardElement);

  closeModal(addCardModal);
  e.target.reset();
  addCardFormValidator.resetValidation();
}

cardPreviewCloseButton.addEventListener("click", () =>
  closeModal(cardPreviewModal)
);

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModal(profileEditModal);
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const profileEditFormValidator = new FormValidator(
  config,
  document.querySelector("#modal-form")
);
const addCardFormValidator = new FormValidator(
  config,
  document.querySelector("#add-card-form")
);

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardWrap.append(cardElement);
});
profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();
