import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector('.popup__save-button')
    this._inputsList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButtonInitialText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputData = {};
    this._inputsList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }


  loading(isLoading) {
    if (isLoading) {
        this._submitButton.textContent = 'Сохранение...'
    } else {
        this._submitButton.textContent = this._submitButtonInitialText;
    }
}



  setInputsValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.closePopup();
    });
  }
  
  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
