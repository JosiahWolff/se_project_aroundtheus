import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api.js";
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
  editAvatarOpenButton,
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

const profileUserInfo = new UserInfo(".profile__title", ".profile__subtitle");

//Create & Render Card

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    //handleLikeClick,
    //handleDeleteClick,
    handlePreviewImage
  );
  return card.getCardElement();
}

function renderCard(cardData) {
  return createCard(cardData);
  //const element = createCard(cardData);
  //cardSection.addItem(element);
}

// Api User Info/Initial Cards

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0f915c02-d173-4ea0-aefb-dc32641e7138",
    "Content-Type": "application/json",
  },
});

api
  .loadPageContent()
  .then(([cards, userData]) => {
    newUserInfo.setUserAvatar(userData.avatar);
    newUserInfo.setUserInfo({
      name: userData["name"],
      about: userData["about"],
      id: userData["_id"],
    });
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

let cardSection;

const newUserInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__image"
);

//

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Add Card

const addCardModal = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardModal.setEventListeners();

function handleAddCardSubmit(data) {
  addCardModal.setLoading(true);
  api
    .addCard(data)
    .then((res) => {
      renderCard(res);
      addCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addCardModal.setLoading(false, "Create"));
}

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

//Edit Profile

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();

function handleProfileEditSubmit(data) {
  profileEditModal.setLoading(true);
  api
    .updateUserInfo(data.title, data.subtitle)
    .then((res) => {
      newUserInfo.setUserInfo(res);
      profileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => profileEditModal.setLoading(false, "Save"));
}

profileEditButton.addEventListener("click", () => {
  const { name, job } = profileUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileSubtitleInput.value = job;

  profileEditFormValidator.resetValidation();

  profileEditModal.open();
});

//Update Avatar

const updateAvatarForm = new PopupWithForm(
  "#avatar-image-modal",
  handleAvatarFormSubmit
);
updateAvatarForm.setEventListeners();

function handleAvatarFormSubmit(data) {
  updateAvatarForm.setLoading(true);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      newUserInfo.setUserAvatar(res.avatar);
      updateAvatarForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateAvatarForm.setLoading(false, "Save");
    });
}

editAvatarOpenButton.addEventListener("click", () => {
  updateAvatarForm.open();
});

//Image Popup/Preview

const cardPreviewModal = new PopupWithImage("#cardPreviewModal");
cardPreviewModal.setEventListeners();

function handlePreviewImage(cardData) {
  cardPreviewModal.open(cardData.link, cardData.name, cardData.name);
}

//Card Like

function handleLikeClick(item) {
  if (!item.isLiked) {
    api
      .likeCard(item.getId())
      .then((res) => {
        item.updateLikeStatus(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .unlikeCard(item.getId())
      .then((res) => {
        item.updateLikeStatus(res.isLiked);
      })
      .catch(console.error);
  }
}

//Card Delete

const confirmDelete = new PopupWithConfirmation("#delete-card-modal");
confirmDelete.setEventListeners();

function handleDeleteClick(card) {
  confirmDelete.open();
  confirmDelete.setSubmitAction(() => {
    confirmDelete.setLoading(true);
    api
      .deleteCard(card.id)
      .then(() => {
        confirmDelete.close();
        card.removeCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        confirmDelete.setLoading(false, "Yes");
      });
  });
}

//Form Validator

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);
