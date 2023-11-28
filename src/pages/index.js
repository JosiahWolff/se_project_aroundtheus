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
  profileTitleInput,
  profileSubtitleInput,
  profileEditButton,
  addNewCardButton,
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

const addCardModal = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardModal.setEventListeners();

const cardPreviewModal = new PopupWithImage("#cardPreviewModal");
cardPreviewModal.setEventListeners();

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();

const profileUserInfo = new UserInfo(".profile__title", ".profile__subtitle");

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards"
);

//Event Listeners

profileEditButton.addEventListener("click", () => {
  const { name, job } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileSubtitleInput.value = job;

  profileEditFormValidator.resetValidation();

  profileEditModal.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

//Functions

function handlePreviewImage(cardData) {
  cardPreviewModal.open(cardData.link, cardData.name, cardData.name);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewImage);
  return card.getCardElement();
}

function handleAddCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;

  const cardData = { name: name, link: link };

  cardSection.addItem(cardData);

  addCardModal.close();
  addCardFormValidator.resetValidation();
}

function handleProfileEditSubmit(inputValues) {
  profileUserInfo.setUserInfo(inputValues.title, inputValues.subtitle);
}

cardSection.renderItems();

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();
