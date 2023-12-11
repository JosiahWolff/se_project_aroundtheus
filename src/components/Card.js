export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardData = cardData;
    this._name = cardData.title;
    this._link = cardData.url;
    this.id = cardData._id;
    this.isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardTemplate = document.querySelector(cardSelector).content;
    this._cardElement = this._cardTemplate
      .querySelector(".cards__card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector("#card-image");
    this._cardTitleEl = this._cardElement.querySelector("#card-title");
    this._likeButton = this._cardElement.querySelector("#heart-image");
    this._deleteButton = this._cardElement.querySelector("#trash-image");
  }

  _setEventListeners() {
    //like-button
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("heart_active");
    });

    //delete-button
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
      this._cardElement = null;
    });

    //card_image
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._cardData);
    });
  }

  updateLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this.id;
  }

  getCardElement() {
    this._setEventListeners();
    this._renderLikes();
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    return this._cardElement;
  }
}
