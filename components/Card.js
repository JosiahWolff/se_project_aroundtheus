export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = this._getElement();
    this._handlePreviewImage = this._handlePreviewImage.bind(this);
  }

  _setEventListeners() {
    //"#heart-image"
    addEventListener("click", () => {
      this._handleLikeIcon();
    });

    //"#trash-image"

    this._cardElement

      .querySelector("#trash-image")

      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handlePreviewImage() {
    const cardPreviewImage = document.querySelector("#modal-preview-image");
    const cardCaption = document.querySelector("#modal-caption");
    cardPreviewImage.src = this._cardData.link;
    cardPreviewImage.alt = this._cardData.name;
    cardCaption.textContent = this._cardData.name;

    openModal(cardPreviewModal);
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
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    const cardImage = this._cardElement.querySelector("#card-image");
    cardImage.addEventListener("click", this._handlePreviewImage);
    // Add other event listeners as needed
  }

  getView() {
    return this._cardElement;
  }

  cardData = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  };

  card = new Card(cardData, "#card-template");
}
