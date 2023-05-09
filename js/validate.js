function showError(formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.input-error_${inputElement.id}`)
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage
  errorElement.classList.add(errorClass)
}

function hideError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.input-error_${inputElement.id}`)
  inputElement.classList.remove(inputErrorClass);
  setTimeout(() => errorElement.textContent = '', 300)
  errorElement.classList.remove(errorClass)
}

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationSettings)
  } else {
    hideError(formElement, inputElement, validationSettings)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.setAttribute('disabled', 'true')
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}

function setEventListeners(formElement, {inputSelector, submitButtonSelector}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, buttonElement, validationSettings)
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSettings)
      toggleButtonState(inputList, buttonElement, validationSettings)
    })
  })
}


function enableValidation({formSelector}) {
  const formList = Array.from(document.querySelectorAll(formSelector))
  formList.forEach(formElement => setEventListeners(formElement, validationSettings))
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'input-error_active'
}

enableValidation(validationSettings)
