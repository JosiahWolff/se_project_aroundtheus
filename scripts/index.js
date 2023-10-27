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

//const modal = document.querySelector(".modal");
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
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector("#card-image");
  const cardTitle = cardElement.querySelector("#card-title");
  const likeButton = cardElement.querySelector("#heart-image");
  const deleteButton = cardElement.querySelector("#trash-image");

  function handlePreviewImage(cardData) {
    cardPreviewImage.src = cardData.link;
    cardPreviewImage.alt = cardData.name;
    cardCaption.textContent = cardData.name;
    openModal(cardPreviewModal);
  }

  cardImage.addEventListener("click", () => handlePreviewImage(cardData));

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("heart_active");
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  return cardElement;
}

cardPreviewCloseButton.addEventListener("click", () =>
  closeModal(cardPreviewModal)
);

/* Event Handlers */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardWrap);
  evt.target.reset();
  closeModal(addCardModal);
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(modal);
  }
});

document.addEventListener("click", (e) => {
  if (modal.classList.contains("modal_opened") && !modal.contains(e.target)) {
    closeModal(modal);
  }
});

document.removeEventListener("keydown", closeModal);
document.removeEventListener("click", closeModal);

/* add new card button */

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
