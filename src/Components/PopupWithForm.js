import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupForm.querySelector(".popup__save-button");
    this._textSubmitButton = this._submitButton.textContent;
    this._textSubmitButtonActive = "Сохранение...";
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

  startLoading() {
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._textSubmitButtonActive;
  }

  stopLoading() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._textSubmitButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.startLoading();
      this._submitHandler(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
