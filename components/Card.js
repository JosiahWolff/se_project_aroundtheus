export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //like-button

    this._likeButton = this._cardElement.querySelector("#heart-image");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    //delete-button
    this._deleteButton = this._cardElement.querySelector("#trash-image");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    //card_image
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("heart_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector("#card-image");
    this._cardTitle = this._cardElement.querySelector("#card-title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
