import 'core-js'
import Card from '../js/components/Card.js'
import FormValidator from '../js/components/FormValidator.js'
import initialCards from '../js/utils/initialCards.js'
import './index.css'
import Section from '../js/components/Section.js'
import PopupWithImage from '../js/components/PopupWIthImage.js'
import PopupWithForm from '../js/components/PopupWithForm.js'
import { editButton, addButton, profilePopupNameInput, profilePopupAboutInput } from '../js/utils/constants.js'
import { validationSettings, validators } from '../js/utils/validationSettings.js'
import UserInfo from '../js/components/UserInfo.js'

// Контейнер карточек

const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    return new Card(item, '#element-template', () => {
      popupWithImage.open({link: item.link, name: item.name})
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
        userInfo.setUserInfo(profilePopup.returnInputValues())
        profilePopup.close()
      }),
      cardPopup = new PopupWithForm('.popup_card', (e) => {
        e.preventDefault()
        cardsContainer.addItem(new Card(cardPopup.returnInputValues(), '#element-template', () => {
          popupWithImage.open({link: cardPopup.inputsValue.link, name: cardPopup.inputsValue.name})
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
  validators[form.id] = formValidator
})

// Кнопки

editButton.addEventListener('click', () => {
  profilePopup.open()
  const {name, about} = userInfo.getUserInfo()
  profilePopupNameInput.value = name
  profilePopupAboutInput.value = about
  validators['popupFormProfile']._toggleButtonState()
  validators['popupFormProfile'].clearValidationErrors()
})

addButton.addEventListener('click', () => {
  cardPopup.open()
  validators['popupFormCard'].clearValidationErrors()
})


