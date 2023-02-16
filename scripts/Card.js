export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }


  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    if (this._elementLikeButton) {
      this._elementLikeButton.addEventListener("click", () => {
        this._handleLikeClick();
      });
    }

    if (this._elementTrashButton) {
      this._elementTrashButton.addEventListener("click", () => {
        this._handleDeleteClick();
      });
    }

    if (this._elementImage) {
      this._elementImage.addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
    }
  }

  _handleLikeClick() {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  generateCard() {
    const elementTemplate = this._getTemplate();

    this._elementLikeButton = elementTemplate.querySelector(".element__like-button");
    this._elementTrashButton = elementTemplate.querySelector(".element__trash-button");
    this._elementImage = elementTemplate.querySelector(".element__image");
    this._elementName = elementTemplate.querySelector(".element__name");

    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    this._element = elementTemplate;

    return this._element;
  }
}
