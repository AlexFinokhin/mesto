import "./index.css";


// pr 9
import { Api } from "../components/Api.js";


import { FormValidator } from "../Components/FormValidator.js";
import { configValid } from "../utils/Сonstants.js";
import { Card } from "../Components/Card.js";
import { UserInfo } from "../Components/UserInfo.js";
import { Section } from "../Components/Section.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopupWithForm } from "../Components/PopupWithForm.js";


import { PopupConfirm } from "../Components/PopupConfirm.js";


import {
  imgPopup,
  popupEditProfile,
  elementsList,
  popupAddCard,
  addCardButton,
  editButton,
  popupAddAvatar,
  buttonAddAvatar,

} from "../utils/Сonstants.js";


const popupDelContent = document.querySelector(
  ".popup_form_confirm"
);


//________________________________API 9999999________________________________//
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "71809042-8d48-4365-9054-51d9ac130004",
    "Content-Type": "application/json",
  },
});
//________________________________API 9999999________________________________//


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
function addTemplateCard(data) {
  const card = new Card(
    data,
    openBigImage,
    async () => {
      try {
        const res = await api.addLike(data._id);
        card.like();
        card.setLikesCount(res);
      } catch (e) {
        console.warn(e);
      }
    },
    async () => {
      try {
        const res = await api.removeLike(data._id);
        card.dislike();
        card.setLikesCount(res);
      } catch (e) {
        console.warn(e);
      }
    },
    ".template-card",
    userId,
    (card) => {
      popupConfirm.openPopup(card);
    }
  );

  const cardElement = card.generateCard();

  return cardElement;
}

const popupConfirm = new PopupConfirm(popupDelContent, (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.remove();
      popupConfirm.closePopup();
    })
    .catch((err) => console.log(err));
});

popupConfirm.setEventListeners();





//________________________________PopupWithImage________________________________//
const openPopupImage = new PopupWithImage(imgPopup);
function openBigImage(name, link) {
  openPopupImage.openPopup(name, link);
}
openPopupImage.setEventListeners();


//________________________________PopupWithForm________________________________//
const addCard = new PopupWithForm(popupAddCard, handleSubmitFormAddContent);

// Форма добавления карточек
async function handleSubmitFormAddContent(data) {
  try {
    const newCard = await api.addCard(data);
    cardList.addItem(addTemplateCard(newCard));
    addCard.closePopup();
  } catch (err) {
    return console.log(err);
  }
}

addCard.setEventListeners();

/*
function handleCardFormSubmit(data) {
  const card = addTemplateCard(data);
  //addCard.loading(); //PR 9
  cardList.addItem(card);
  addCard.closePopup();
}

addCard.setEventListeners();
*/












//________________________________PopupWithForm________________________________//
const editInfo = new PopupWithForm(popupEditProfile, handleProfileFormSubmit);
//////////////////////////////////////////////999999999999999
async function handleProfileFormSubmit(data) {
  try {
    const userData = await api.editUserInfo(data);
    userInfo.setUserInfo(userData);
    editInfo.closePopup();
  } catch (err) {
    return console.log(err);
  }
}
editInfo.setEventListeners();
//////////////////////////////////////////99999999999999999999999
/*
function handleProfileFormSubmit(data) {
  editInfo.loading();//PR 9
  userInfo.setUserInfo(data);
}


*/

const popupUpdateAvatar = document.querySelector(
  ".popup_form_avatar"
); //PR 9


//________________________________popupAvatar________________________________//
const popupAvatar = new PopupWithForm(popupUpdateAvatar, handleSubmitFormUpdateAvatar); //PR 9

  async function handleSubmitFormUpdateAvatar(data) {
    try {
      const userData = await api.updateUserAvatar(data);
      userInfo.setUserInfo(userData);
      popupAvatar.closePopup();
    } catch (err) {
      return console.log(err);
    }
  }

  popupAvatar.setEventListeners();

//________________________________popupAvatar________________________________//



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

//____________________// PR 9 AVATAR
buttonAddAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.openPopup();
    formAvatarEditValidation.resetValidation();
  },
  false
);
//____________________// PR 9 AVATAR









//________________________________FormValidator________________________________//
const formProfileEditValidation = new FormValidator(configValid, popupEditProfile);
formProfileEditValidation.enableValidation();

const formAddCardValidation = new FormValidator(configValid, popupAddCard);
formAddCardValidation.enableValidation();

//PR 9 AVATAR
const formAvatarEditValidation = new FormValidator(configValid, popupAddAvatar);
formAvatarEditValidation.enableValidation();


// Получаем карточки с сервера после того,
// как получим данные пользователя
Promise.all([api.getCurrentUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));