export class Card {
  constructor(data, handleCardClick,  like, dislike, templateSelector, userId, deleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._id = data._id;


    this._likes = data.likes;
    this._like = like;
    this._dislike = dislike;

    this._ownerId = data.owner._id;
    this._deleteCard = deleteCard;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      if (this._likeBtn.classList.contains("element__like-button_active")) {
        this._dislike();
      } else {
        this._like();
      }
    });

    this._elementTrashButton.addEventListener("click", () => {
      this._deleteCard(this._id);
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this._like();
      } else {
        this._dislike();
      }
    });
  }

  like() {
    this._likeBtn.classList.add("element__like-button_active");
  }

  dislike() {
    this._likeBtn.classList.remove("element__like-button_active");
  }

  setLikesCount(res) {
    this._likesQty.textContent = `${res.likes.length}`;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    const elementTemplate = this._getTemplate();

    this._likeBtn = elementTemplate.querySelector(
      ".element__like-button"
    );
    this._likesQty = elementTemplate.querySelector(".element__like-count");
    this._likesQty.textContent = this._likes.length;

    this._elementTrashButton = elementTemplate.querySelector(
      ".element__trash-button"
    );
    if (this._ownerId !== this._userId) {
      this._elementTrashButton.remove();
    }





    this._elementImage = elementTemplate.querySelector(".element__image");
    this._elementName = elementTemplate.querySelector(".element__name");

    this._setEventListeners();
    this._isLiked();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    this._element = elementTemplate;

    return this._element;
  }
}
