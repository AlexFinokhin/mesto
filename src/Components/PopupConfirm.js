import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  openPopup(card) {
    this._card = card;
    super.openPopup();
  }

  // перезаписывает родительский метод setEventListeners.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      // Отмена стандартной формы отправки
      evt.preventDefault();
      this._submitHandler(this._card);
    });
  }

  /* close() {
    super.close();
  } */
}
