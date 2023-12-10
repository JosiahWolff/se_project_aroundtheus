import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      "#modal-preview-image"
    );
    this._titleElement = this._popupElement.querySelector("#modal-caption");
  }

  open(imageUrl, imageAlt, title) {
    this._imageElement.src = imageUrl;
    this._imageElement.alt = imageAlt;
    this._titleElement.textContent = title;
    super.open();
  }
}
