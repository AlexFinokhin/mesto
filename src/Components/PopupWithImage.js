import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(name, link) {
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__text");
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    super.openPopup();
  }
}
