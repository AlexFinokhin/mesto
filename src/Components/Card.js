export class Card {
  constructor(
    data,
    handleCardClick,
    setLike,
    removeLike,
    templateSelector,
    userId,
    deleteCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._id = data._id;
    this._likes = data.likes;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._ownerId = data.owner._id;
    this._deleteCard = deleteCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

   _handleLikeClick = () => {
    if (this._elementLikeButton.classList.contains('element__like-button_active')) {
      this._removeLike();
    } else {
      this._setLike();
    }
  };

  _handleTrashClick = () => {
    this._deleteCard(this._id);
  };

  _handleImageClick = () => {
    this._handleCardClick(this._name, this._link);
  };

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', this._handleLikeClick);
    this._elementTrashButton.addEventListener('click', this._handleTrashClick);
    this._elementImage.addEventListener('click', this._handleImageClick);
  }
  
  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this._setLike();
      } else {
        this._removeLike();
      }
    });
  }

  setLikesCount(res) {
    this._elementLikesQuantity.textContent = `${res.likes.length}`;
  }

  setLike() {
    this._elementLikeButton.classList.add("element__like-button_active");
  }

  removeLike() {
    this._elementLikeButton.classList.remove("element__like-button_active");
  }

  
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    const elementTemplate = this._getTemplate();

    this._elementLikeButton = elementTemplate.querySelector(".element__like-button");
    this._elementLikesQuantity = elementTemplate.querySelector(".element__like-count");
    this._elementLikesQuantity.textContent = this._likes.length;

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
