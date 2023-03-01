import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputData = {};
    this._inputsList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  setInputsValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _setLoading(isLoading) {
    const submitButton = this._popupForm.querySelector(".popup__save-button");
    if (isLoading) {
      submitButton.textContent = "Сохранение...";
    } else {
      submitButton.textContent = "Сохранить";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setLoading(true);
      this._submitHandler(this._getInputValues())
        .then(() => {
          this.closePopup();
        })
        .finally(() => {
          this._setLoading(false);
        });
    });
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
