export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //"#heart-image"
    likeButton = this._cardElement
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
    const cardPreviewCloseButton = this._cardElement
      .querySelector("#card-preview-close-button")
      .addEventListener("click", () => closeModal(cardPreviewModal));
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon = () => {
    this._cardElement
      .querySelector("#heart-image")
      .classList.toggle("heart_active");
  };

  _getElement() {
    return document
      .querySelector(this._cardSelector)

      .content.querySelector(".cards__card")

      .cloneNode(true);
  }

  updateContents(data) {
    const cardTitle = this._cardElement.querySelector(".card__title");
    const cardDescription =
      this._cardElement.querySelector(".card__description");

    cardTitle.textContent = data.title;
    cardDescription.textContent = data.description;
  }

  getView() {
    this._cardElement = this._getElement()
    const card = new Card(cardData, "#card-template");

    this._setEventListeners();
    return this._getElement;
  }
}
