import "./index.css";

import { FormValidator } from "../Components/FormValidator.js";
import { configValid, initialCards } from "../utils/Сonstants.js";
import { Card } from "../Components/Card.js";
import { UserInfo } from "../Components/UserInfo.js";
import { Section } from "../Components/Section.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopupWithForm } from "../Components/PopupWithForm.js";
import {
  imgPopup,
  popupEditProfile,
  elementsList,
  popupAddCard,
  addCardButton,
  editButton,
} from "../utils/Сonstants.js";

//________________________________Section________________________________//
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = addTemplateCard(item);
      cardList.addDefaultItem(cardElement);
    },
  },
  elementsList
);
cardList.renderItems();

//________________________________Card________________________________//
function addTemplateCard({ name, link }) {
  const card = new Card(
    { name, link, handleCardClick: popupBigImage },
    ".template-card"
  );

  const cardElement = card.generateCard();

  return cardElement;
}

//________________________________PopupWithImage________________________________//
const openPopupImage = new PopupWithImage(imgPopup);
openPopupImage.setEventListeners();

function popupBigImage(name, link) {
  openPopupImage.openPopup(name, link);
}

//________________________________UserInfo________________________________//
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
});

//________________________________PopupWithForm________________________________//
const addCard = new PopupWithForm(popupAddCard, formAddCard);

function formAddCard(data) {
  const card = addTemplateCard(data);
  cardList.addItem(card);
  addCard.closePopup();
}
addCard.setEventListeners();

//________________________________PopupWithForm________________________________//
const editInfo = new PopupWithForm(popupEditProfile, formEditProfile);
function formEditProfile(data) {
  userInfo.setUserInfo(data);
}

editInfo.setEventListeners();

addCardButton.addEventListener(
  "click", () => {
    addCard.openPopup();
    formAddCardValidation.disableSubmitButton();
    formAddCardValidation.resetValidation();
  },
  false
);

editButton.addEventListener(
  "click", () => {
    editInfo.openPopup();
    editInfo.setInputsValues(userInfo.getUserInfo());
    formProfileEditValidation.resetValidation();
  },
  false
);

//________________________________FormValidator________________________________//
const formProfileEditValidation = new FormValidator(configValid, popupEditProfile);
formProfileEditValidation.enableValidation();

const formAddCardValidation = new FormValidator(configValid, popupAddCard);
formAddCardValidation.enableValidation();
