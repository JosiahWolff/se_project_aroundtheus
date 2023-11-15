export default class Card {
  constructor(
    data,
    cardSelector,
    handleImagePreview,
    handleLikeButton,
    handleDeleteButton
  ) {
    this._link = data.link;
    this._name = data.name;
    // --
    this._cardTemplate = document
      .querySelector(cardSelector)
      .content.querySelector("#card-template");
    // --
    this._handleImagePreview = handleImagePreview;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteButton = handleDeleteButton;
    // --
    this._element;
    this._previewImage;
  }

  createCardElement() {
    this._element = this.getCardElement();
    this._setTextAndImage();
    this._setEventListeners();
    return this._element;
  }

  _setTextAndImage() {
    this._deleteButton = this._element.querySelector("#trash-image");
    this._likeButton = this._element.querySelector("#heart-image");
    this._previewImage = this._element.querySelector("#modal-preview-image");
    this._previewImage.src = this._link;
    this._previewImage.alt = this._name;
    this._element.querySelector(".modal__title").textContent = this._name;
  }

  getCardElement() {
    return this._cardTemplate;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._previewImage.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }

  handleDelete() {
    this._element.remove();
  }

  _handleLike() {
    if (this.isLiked()) {
      this._likeButton.classList.add("heart_active");
    } else {
      this._likeButton.classList.remove("heart_active");
    }
  }
}

/*
export default class Card {
  constructor({ link, name }, cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardElement = this.createCardElement();
    this._handlePreviewImage = this._handlePreviewImage.bind(this);
    this._setEventListeners();
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
    //preview image
    const cardImage = this._cardElement.querySelector("#card-image");
    cardImage.addEventListener("click", () => {
      this._handlePreviewImage(this);
    });
  }

  createCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._setEventListeners();
    return this._cardElement;
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

  getView() {
    return this._cardElement;
  }
}

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
*/
