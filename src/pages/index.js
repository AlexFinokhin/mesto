import "./index.css";

import { Api } from "../components/Api.js";
import { Card } from "../Components/Card.js";
import { configValid } from "../utils/Сonstants.js";
import { FormValidator } from "../Components/FormValidator.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopupWithForm } from "../Components/PopupWithForm.js";
import { PopupWithSubmit } from "../Components/PopupWithSubmit.js";
import { Section } from "../Components/Section.js";
import { UserInfo } from "../Components/UserInfo.js";

import {
  imgPopup,
  popupEditProfile,
  elementsList,
  popupAddCard,
  buttonOpenPopupCard,
  buttonEditProfile,
  popupAddAvatar,
  buttonEditAvatar,
  popupDeleteCard,
  popupEditAvatar,
} from "../utils/Сonstants.js";

//________________________________API________________________________//
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "71809042-8d48-4365-9054-51d9ac130004",
    "Content-Type": "application/json",
  },
});

//________________________________UserInfo________________________________//

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  profileAvatarSelector: ".profile__avatar",
});

//________________________________Section________________________________//
const cardList = new Section(
  {
    renderer: (data) => {
      const cardElement = addTemplateCard(data);
      cardList.addItem(cardElement);
    },
  },
  elementsList
);

//________________________________Card________________________________//
let userId;
const addTemplateCard = (data) => {
  const card = new Card(
    data,
    () => openPopupImage.openPopup(data.name, data.link),
    async () => {
      try {
        const res = await api.putLike(data._id);
        card.setLike();
        card.setLikesCount(res);
      } catch (err) {
        console.log(err);
      }
    },
    async () => {
      try {
        const res = await api.deleteLike(data._id);
        card.removeLike();
        card.setLikesCount(res);
      } catch (err) {
        console.log(err);
      }
    },
    ".template-card",
    userId,
    () => deleteCardConfirm.openPopup(card)
  );

  return card.generateCard();
};

//________________________________PopupWithImage________________________________//
const openPopupImage = new PopupWithImage(imgPopup);
openPopupImage.setEventListeners();

//________________________________PopupWithSubmit________________________________//

const deleteCardConfirm = new PopupWithSubmit(popupDeleteCard, (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      //card.remove();
      deleteCardConfirm.closePopup();
    })
    .catch((err) => console.log(err));
});

deleteCardConfirm.setEventListeners();

//________________________________PopupWithForm________________________________//
const addCard = new PopupWithForm(popupAddCard, async (data) => {
  try {
    const newCard = await api.addCard(data);
    cardList.addItem(addTemplateCard({ ...newCard }));
    addCard.closePopup();
  } catch (err) {
    console.log(err);
  } finally {
    addCard.stopLoading(false);
  }
});

addCard.setEventListeners();

//________________________________PopupWithForm________________________________//
const editInfo = new PopupWithForm(popupEditProfile, async (data) => {
  try {
    const userData = await api.setUserInfo(data);
    userInfo.setUserInfo(userData);
    editInfo.closePopup();
  } catch (err) {
    console.log(err);
  } finally {
    editInfo.stopLoading(false);
  }
});

editInfo.setEventListeners();

//________________________________popupEditAvatar________________________________//
const editAvatar = new PopupWithForm(popupEditAvatar, async (data) => {
  try {
    const userData = await api.setUserAvatar(data);
    userInfo.setUserInfo(userData);
    editAvatar.closePopup();
  } catch (err) {
    console.log(err);
  } finally {
    editAvatar.stopLoading(false);
  }
});

editAvatar.setEventListeners();

//________________________________Buttons________________________________//
buttonOpenPopupCard.addEventListener(
  "click",
  () => {
    addCard.openPopup();
    formAddCardValidation.disableSubmitButton();
    formAddCardValidation.resetValidation();
  },
  false
);

buttonEditProfile.addEventListener(
  "click",
  () => {
    editInfo.openPopup();
    editInfo.setInputsValues(userInfo.getUserInfo());
    formProfileEditValidation.resetValidation();
  },
  false
);

buttonEditAvatar.addEventListener(
  "click",
  () => {
    editAvatar.openPopup();
    formAvatarEditValidation.resetValidation();
  },
  false
);

//________________________________FormValidator________________________________//
const formProfileEditValidation = new FormValidator(
  configValid,
  popupEditProfile
);
formProfileEditValidation.enableValidation();

const formAddCardValidation = new FormValidator(configValid, popupAddCard);
formAddCardValidation.enableValidation();

const formAvatarEditValidation = new FormValidator(configValid, popupAddAvatar);
formAvatarEditValidation.enableValidation();

//________________________________Promise.all________________________________//
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));
