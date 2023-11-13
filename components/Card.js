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
    const handlePreviewImage = this._cardElement
      .querySelector("#cardPreviewModal")
      .addEventListener("click", () => open(cardPreviewModal));
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

  getView() {
    this._cardElement = this._getElement()
<<<<<<< HEAD
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
    cardPreviewImage.src = cardData.link;
    cardPreviewImage.alt = cardData.name;
    cardCaption.textContent = cardData.name;
=======
    const card = new Card(cardData, "#card-template");
>>>>>>> 421de8728dfdd208e4ad55875faf7bc22e1327c1

    this._setEventListeners();
    return this._cardElement;
  }
}
