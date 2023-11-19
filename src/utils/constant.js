export const initialCards = [
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

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardFormElement = addCardModal.querySelector("#add-card-form");

//profile
export const profileTitle = document.querySelector("#profile-title");
export const profileSubtitle = document.querySelector("#profile-subtitle");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileSubtitleInput = document.querySelector(
  "#profile-subtitle-input"
);
export const profileEditForm = profileEditModal.querySelector("#modal-form");

//card
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardWrap = document.querySelector("#cards");
export const cardTitleInput =
  addCardFormElement.querySelector("#card-title-input");
export const cardUrlInput = addCardFormElement.querySelector("#card-url-input");
export const cardPreviewImage = document.querySelector("#modal-preview-image");
export const cardCaption = document.querySelector("#modal-caption");
export const cardPreviewModal = document.querySelector("#cardPreviewModal");

//buttons
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditCloseButton =
  profileEditModal.querySelector("#modal-close");
export const addNewCardButton = document.querySelector("#profile__button");
export const addCardModalCloseButton =
  addCardModal.querySelector("#modal-card-close");
export const cardPreviewCloseButton = cardPreviewModal.querySelector(
  "#card-preview-close-button"
);
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
