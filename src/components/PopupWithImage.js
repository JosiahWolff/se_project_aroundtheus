import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      "#modal-preview-image"
    );
    this._titleElement = this._popupElement.querySelector("#modal-caption");
  }

  open(imageLink, imageAlt, name) {
    this._imageElement.src = imageLink;
    this._imageElement.alt = imageAlt;
    this._titleElement.textContent = name;
    super.open();
  }
}
