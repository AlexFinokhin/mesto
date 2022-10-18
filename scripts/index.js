const popup = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_form_edit');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileForm = document.querySelector(".popup__form_profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const profileNameInput = document.querySelector("#nameInput");
const profileJobInput = document.querySelector("#jobInput");
const editButton = document.querySelector(".profile__edit-button");
const imgPopup = document.querySelector(".popup_viewer");
const titlePopup = imgPopup.querySelector(".popup__text");
const cardsContainer = document.querySelector(".elements__list");
const templateCard = document.querySelector(".template-card").content;
const popupActiveClass = "popup_opened";

function addCardListeners(card, cardData) {
  card
    .querySelector(".element__like-button")
    .addEventListener("click", activeLikeBtn);
  card
    .querySelector(".element__trash-button")
    .addEventListener("click", deleteCard);
  card.querySelector(".element__image").addEventListener("click", () => {
    openPopupCardShow(cardData);
  });
}

const formAddNewCard = popupAddCard.querySelector(".popup__form");
formAddNewCard.addEventListener("submit", addCard);
const cardElement = document.querySelector(".template-card").content;

function createCard(data) {
  const newCard = cardElement.querySelector(".element").cloneNode(true);
  const elementImage = newCard.querySelector(".element__image");

  elementImage.src = data.link;
  elementImage.alt = data.name;

  newCard.querySelector(".element__name").textContent = data.name;

  addCardListeners(newCard, data);
  return newCard;
}

function addTemplateCard(data) {
  const cardClone = createCard(data);
  cardsContainer.prepend(cardClone);
}

function addCard(event) {
  event.preventDefault();
  const cardName = event.target.querySelector("#typePlace").value;
  const cardLink = event.target.querySelector("#typeUrl").value;
  addTemplateCard({ name: cardName, link: cardLink });
  event.target.reset();
  hidePopup(popupAddCard);
}

initialCards.map(addTemplateCard);

const elImg = imgPopup.querySelector("img");

function openPopupCardShow(cardData) {
  elImg.src = cardData.link;
  elImg.alt = cardData.name;
  titlePopup.textContent = cardData.name;
  showPopup(imgPopup);
}

function activeLikeBtn(event) {
  const btn = event.target;
  btn.classList.toggle("element__like-button_active");
}

function deleteCard(event) {
  const card = event.target.closest(".element");
  card.remove();
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

popup.forEach((popup) => {
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

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fillProfile();
  hidePopup(popupEditProfile);
});

popup.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains(popupActiveClass)) {
      hidePopup(popup);
    }
  });
});