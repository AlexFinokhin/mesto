export class Card {
  constructor({ name, link, handleCardClick }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._elementTrashButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    const elementTemplate = this._getTemplate();

    this._elementLikeButton = elementTemplate.querySelector(
      ".element__like-button"
    );
    this._elementTrashButton = elementTemplate.querySelector(
      ".element__trash-button"
    );
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
