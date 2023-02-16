import { FormValidator } from "./FormValidator.js";
import { configValid, initialCards } from "./Сonstants.js";
import { Card } from "./Card.js";

const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_form_edit");
const popupAddCard = document.querySelector(".popup_type_add-card");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileForm = document.querySelector(".popup__form_profile");
const profileNameInput = document.querySelector("#nameInput");
const profileJobInput = document.querySelector("#jobInput");
const editButton = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector(".elements__list");
const typePlace = document.querySelector("#typePlace");
const typeUrl = document.querySelector("#typeUrl");
const popupActiveClass = "popup_opened";
const formAddNewCard = popupAddCard.querySelector(".popup__form");
const buttonPlace = formAddNewCard.querySelector(".popup__save-button");

formAddNewCard.addEventListener("submit", addCard);

function addCard(event) {
  event.preventDefault();
  addTemplateCard({ name: typePlace.value, link: typeUrl.value });
  event.currentTarget.reset();
  hidePopup(popupAddCard);
  buttonPlace.disabled = true;
  buttonPlace.classList.add("popup__save-button_disabled");
}

function addTemplateCard({ name, link }) {
  const card = new Card({ name, link }, ".template-card", openPopup);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

initialCards.map(addTemplateCard);

const imgPopup = document.querySelector(".popup_viewer");
const elImg = imgPopup.querySelector(".popup__image");
const titlePopup = imgPopup.querySelector(".popup__text");

function openPopup(cardData) {
  elImg.src = cardData.link;
  elImg.alt = cardData.name;
  titlePopup.textContent = cardData.name;
  showPopup(imgPopup);
}

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fillProfile();
  hidePopup(popupEditProfile);
});

function fillProfile() {
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
}

function fillProfileInputs() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  showPopup(popupEditProfile);
}

popups.forEach((popup) => {
  const btnClose = popup.querySelector(".popup__close-button");
  btnClose.addEventListener("click", () => hidePopup(popup));
});

function showPopup(popup) {
  popup.classList.add(popupActiveClass);
  document.addEventListener("keydown", closeByEsc);
}

function hidePopup(popup) {
  popup.classList.remove(popupActiveClass);
  document.removeEventListener("keydown", closeByEsc);
}

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => showPopup(popupAddCard));
editButton.addEventListener("click", fillProfileInputs);

function closeByEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    hidePopup(popupOpened);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains(popupActiveClass)) {
      hidePopup(popup);
    }
  });
});

const formProfileEditValidation = new FormValidator(configValid,popupEditProfile);
formProfileEditValidation.enableValidation();

const formAddCardValidation = new FormValidator(configValid, popupAddCard);
formAddCardValidation.enableValidation();
