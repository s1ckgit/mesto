import 'core-js'
import Card from '../js/components/Card.js'
import FormValidator from '../js/components/FormValidator.js'
import initialCards from '../js/utils/initialCards.js'
import './index.css'
import Section from '../js/components/Section.js'
import PopupWithImage from '../js/components/PopupWIthImage.js'
import PopupWithForm from '../js/components/PopupWithForm.js'
import { editButton, addButton } from '../js/utils/constants.js'
import { validationSettings, validators } from '../js/utils/validationSettings.js'
import UserInfo from '../js/components/UserInfo.js'

// Контейнер карточек

const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    return new Card(item, '#element-template', () => {

      popupWithImage._image.src = item.link
      popupWithImage._image.alt = item.name
      popupWithImage._title.textContent = item.name
      popupWithImage.open()
    }).generateCard()
  }
}, '.elements')
cardsContainer.renderAll()

// Информация из профиля

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'})

// Попапы

const popupWithImage = new PopupWithImage('.popup_image'),
      profilePopup = new PopupWithForm('.popup_profile', (e) => {
        e.preventDefault()
        profilePopup._getInputValues()
        userInfo.setUserInfo(profilePopup._inputsValue)
        profilePopup.close()
      }),
      cardPopup = new PopupWithForm('.popup_card', (e) => {
        e.preventDefault()
        cardPopup._getInputValues()
        cardsContainer.addItem(new Card(cardPopup._inputsValue, '#element-template', () => {
          popupWithImage._image.src = cardPopup._inputsValue.link
          popupWithImage._image.alt = cardPopup._inputsValue.name
          popupWithImage._title.textContent = cardPopup._inputsValue.name
          popupWithImage.open()
        }).generateCard())
        cardPopup.close()
      })

popupWithImage.setEventListeners()
profilePopup.setEventListeners()
cardPopup.setEventListeners()

// Валидаторы

Array.from(document.querySelectorAll(validationSettings.formSelector)).forEach(form => {
  const formValidator = new FormValidator(validationSettings, form)
  formValidator.enableValidation()
  validators.push(formValidator)
})

// Кнопки

editButton.addEventListener('click', () => {
  profilePopup.open()
  profilePopup._popup.querySelector('[name="name"]').value = userInfo.getUserInfo().name
  profilePopup._popup.querySelector('[name="about"]').value = userInfo.getUserInfo().about
  validators[0]._toggleButtonState()
})

addButton.addEventListener('click', () => {
  cardPopup.open()
})


