import "./index.css";

import { FormValidator } from "../Components/FormValidator.js";
import { configValid, initialCards } from "../utils/Сonstants.js";
import { Card } from "../Components/Card.js";
import { UserInfo } from "../Components/UserInfo.js";
import { Section } from "../Components/Section.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopupWithForm } from "../Components/PopupWithForm.js";
//import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
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
    { name, link, handleCardClick: openBigImage },
    ".template-card"
  );

  const cardElement = card.generateCard();

  return cardElement;
}

//________________________________PopupWithImage________________________________//
const openPopupImage = new PopupWithImage(imgPopup);
openPopupImage.setEventListeners();

function openBigImage(name, link) {
  openPopupImage.openPopup(name, link);
}

//________________________________UserInfo________________________________//
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  
});

//________________________________PopupWithForm________________________________//
const addCard = new PopupWithForm(popupAddCard, handleCardFormSubmit);

function handleCardFormSubmit(data) {
  const card = addTemplateCard(data);
  addCard.loading(); //PR 9
  cardList.addItem(card);
  addCard.closePopup();
}
addCard.setEventListeners();

//________________________________PopupWithForm________________________________//
const editInfo = new PopupWithForm(popupEditProfile, handleProfileFormSubmit);
function handleProfileFormSubmit(data) {
  editInfo.loading();//PR 9
  userInfo.setUserInfo(data);
}

editInfo.setEventListeners();


const popupUpdateAvatar = document.querySelector(
  ".popup_form_avatar"
); //PR 9



const popupAvatar = new PopupWithForm(
  popupUpdateAvatar,
  handleSubmitFormUpdateAvatar); //PR 9


function handleSubmitFormUpdateAvatar(data) {

  popupAvatar.closePopup();

  }
  popupAvatar.setEventListeners();

  const buttonUpdateAvatar = document.querySelector(
    ".profile__avatar-edit"
  );






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


// PR 9 AVATAR
buttonUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.openPopup();
    formAvatarEditValidation.enableValidation();
    formAvatarEditValidation.disableSubmitButton();

  },
  false
);







const formAvatarEdit = document.querySelector(".popup_form_avatar");


//________________________________FormValidator________________________________//
const formProfileEditValidation = new FormValidator(configValid, popupEditProfile);
formProfileEditValidation.enableValidation();

const formAddCardValidation = new FormValidator(configValid, popupAddCard);
formAddCardValidation.enableValidation();

//PR 9 AVATAR
const formAvatarEditValidation = new FormValidator(configValid, formAvatarEdit);
formAvatarEditValidation.enableValidation();
