export default class Card {
  constructor(cardSelector, cardData, handleImageClick) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this.id = cardData._id;
    this.isLiked = cardData.isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector("#heart-image");
    this._deleteButton = this._cardElement.querySelector("#trash-image");
    const cardTitle = this._cardElement.querySelector(".cards__title");
    cardTitle.textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
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
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
}
