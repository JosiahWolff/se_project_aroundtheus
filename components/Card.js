export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //"#heart-image"
    const likeButton = this._cardElement
      .querySelector("#heart-image")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //"#trash-image"
    const deleteButton = this._cardElement
      .querySelector("#trash-image")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector("#heart-image")
      .classList.toggle("heart_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._setEventListeners();
  }
}
