import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  initialCards,
  config,
  profileEditModal,
  addCardModal,
  addCardFormElement,
  profileTitle,
  profileSubtitle,
  profileTitleInput,
  profileSubtitleInput,
  profileEditForm,
  cardTemplate,
  cardWrap,
  cardTitleInput,
  cardUrlInput,
  cardPreviewImage,
  cardCaption,
  cardPreviewModal,
  profileEditButton,
  //profileEditCloseButton,
  addNewCardButton,
  //addCardModalCloseButton,
  //cardPreviewCloseButton,
} from "../utils/constant.js";

// Variables
const profileEditFormValidator = new FormValidator(
  config,
  document.querySelector("#modal-form")
);
const addCardFormValidator = new FormValidator(
  config,
  document.querySelector("#add-card-form")
);

const newCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#cardPreviewModal");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description"
);

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

/* Functions */

//open Modal
/*
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

//close Modal

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

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
}*/

//Event Listeners

profileEditButton.addEventListener("click", () => {
  const { name, job } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileSubtitleInput.value = job;

  profileEditFormValidator.resetValidation();

  profileEditModal.open();
});

//profileEditCloseButton.addEventListener("click", () =>
//  closeModal(profileEditModal)
//);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

//addCardModalCloseButton.addEventListener("click", () =>
//  closeModal(addCardModal)
//);

//cardPreviewCloseButton.addEventListener("click", () =>
//  closeModal(cardPreviewModal)
//);

//handlers

function handlePreviewImage(cardData) {
  cardPreviewImage.src = cardData.link;
  cardPreviewImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  cardPreviewModal.open();
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
  const cardElement = createCard(cardData);
  cardWrap.prepend(cardElement);

  addCardModal.close();
  e.target.reset();
  addCardFormValidator.resetValidation();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  profileEditModal.close();
}

//objects

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardWrap.append(cardElement);
});

cardSection.renderItems();

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();
