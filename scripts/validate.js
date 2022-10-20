// ПРОВЕРКА ВАЛИДНОСТИ
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
}

//ОТОБРАЖЕНИЕ СООБЩЕНИЙ ОБ ОШИБКЕ
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  if (!inputElement) return;
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

//СКРЫТИЕ СООБЩЕНИЙ ОБ ОШИБКЕ
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement) return;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  if (!errorElement) return;
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  
}

//НЕАКТИВНАЯ КНОПКА
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElement && formElement.checkValidity();
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
  buttonElement.disabled = !isFormValid;
}

//reset btn valid
function removeButtonState(buttonElement, inactiveButtonClass) {
  toggleButtonState(false, buttonElement, inactiveButtonClass)
}

//КАСТОМНАЯ ВАЛИДАЦИЯ
const setEventListeners = (formElement, {
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => { //функция валидации
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  formElement.addEventListener('submit', e => {
    e.preventDefault();
    removeButtonState(buttonElement, inactiveButtonClass)
  });
  
  
  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    });
  })
}

//КАСТОМНАЯ ВАЛИДАЦИЯ ДЛЯ ВСЕХ ФОРМ В РАЗМЕТКЕ
const enableValidation = ({
                            formSelector,
                            ...rest
                          }) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  })
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});
