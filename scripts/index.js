let popup = document.querySelectorAll(".popup");
let popupEditProfile = document.querySelector(".popup_form_edit");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let profileForm = document.querySelector(".popup__form");
let profileNameInput = document.querySelector("#nameInput");
let profileJobInput = document.querySelector("#jobInput");
let editButton = document.querySelector(".profile__edit-button");
let popupActiveClass = "popup_opened";

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
