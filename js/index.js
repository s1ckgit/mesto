import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import initialCards from "./initialCards.js"

const editButton = document.querySelector('.profile__edit'),
  addButton = document.querySelector('.profile__add'),
  profilePopup = document.querySelector('.popup_profile'),
  cardPopup = document.querySelector('.popup_card'),
  imagePopup = document.querySelector('.popup_image'),
  profileName = document.querySelector('.profile__name'),
  profileAbout = document.querySelector('.profile__about'),
  nameInput = document.querySelector('#name'),
  aboutInput = document.querySelector('#about'),
  imagePopupImg = document.querySelector('.popup__img'),
  imagepPopupTitle = document.querySelector('.popup__title_image'),
  cardsContainer = document.querySelector('.elements')

nameInput.value = profileName.textContent
aboutInput.value = profileAbout.textContent

addButton.addEventListener('click', () => {
  openPopup(cardPopup)
})

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  validators[0].clearValidationErrors()
  openPopup(profilePopup)
})

profilePopup.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  closePopup(profilePopup)
})

cardPopup.addEventListener('submit', handleCardPopupSubmit)

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  setPopupClosingListeners(popupElement)
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
  removePopupClosingListeners(popupElement)
}

function setPopupClosingListeners(popupElement) {
  popupElement.addEventListener('click', handlePopupClose)
  document.addEventListener('keydown', handleEscape)
}

function removePopupClosingListeners(popupElement) {
  popupElement.removeEventListener('click', handlePopupClose)
  document.removeEventListener('keydown', handleEscape)
}

function handlePopupClose(event) {
  if(event.target.matches(".popup") || event.target.matches(".popup__close")) {
    closePopup(event.currentTarget)
  }
}

function handleEscape(event) {
  if(event.key && event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function handleCardPopupSubmit(event) {
  event.preventDefault()
  const inputData = {
    name: cardPopup.querySelector('#title').value,
    link: cardPopup.querySelector('#link').value
  }
  cardsContainer.prepend(new Card(inputData, '#element-template').generateCard())
  event.target.reset()
  closePopup(cardPopup)
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'input-error_active'
}

const validators = []

Array.from(document.querySelectorAll(validationSettings.formSelector)).forEach(form => {
  const formValidator = new FormValidator(validationSettings, form)
  formValidator.enableValidation()
  validators.push(formValidator)
})



initialCards.forEach(card => {
  const cardObj = new Card(card, '#element-template')
  const cardElement = cardObj.generateCard()

  cardsContainer.append(cardElement)
})

export { imagePopupImg, imagepPopupTitle, openPopup, imagePopup }
