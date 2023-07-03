import 'core-js'
import Api from '../js/components/Api.js'
import FormValidator from '../js/components/FormValidator.js'
import Section from '../js/components/Section.js'
import PopupWithImage from '../js/components/PopupWIthImage.js'
import PopupWithForm from '../js/components/PopupWithForm.js'
import { editButton, addButton, profilePopupNameInput, profilePopupAboutInput,
  profilePopupButton, avatar, avatarWrapper, cardPopupButton, avatarPopupButton
} from '../js/utils/constants.js'
import { validationSettings, validators } from '../js/utils/validationSettings.js'
import UserInfo from '../js/components/UserInfo.js'
import { createCardElement } from '../js/utils/utils.js'
import './index.css'

// Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'b514bb1d-ded6-4571-bfdc-a5db1d8e949e',
    'Content-Type': 'application/json'
  }
})

// Promises

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(data => {
    // Рендер карточек
    const cardsContainer = new Section({
      items: data[1].reverse(),
      renderer: (item) => {
        return createCardElement(item, api, data[0])
      }
    }, '.elements')
    cardsContainer.renderAll()

    // Загрузка данных пользователя
    userInfoElement.setUserInfo(data[0])

    // Создание попапов
    profilePopup = new PopupWithForm('.popup_profile', (e) => {
      e.preventDefault()
      profilePopupButton.textContent = 'Сохранение...'
      api.changeUserInfo(profilePopup.returnInputValues())
        .then(res => {
          userInfoElement.setUserInfo(res)
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
        })
        .finally(() => {
          profilePopupButton.textContent = 'Сохранить'
          profilePopup.close()
        })

    })
    cardPopup = new PopupWithForm('.popup_card', (e) => {
      e.preventDefault()
      cardPopupButton.textContent = 'Сохранение...'
      api.addCard(cardPopup.returnInputValues())
        .then(res => {
          cardsContainer.addItem(createCardElement(res, api, data[0]))
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
        })
        .finally(() => {
          cardPopupButton.textContent = 'Создать'
          cardPopup.close()
        })

    })

    profilePopup.setEventListeners()
    cardPopup.setEventListeners()
  })
  .catch(err => {
    console.log(`Что-то пошло не так...
    Ошибка: ${err}`)
  })

// Информация из профиля

const userInfoElement = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'})

// Попапы

let profilePopup, cardPopup

const popupWithImage = new PopupWithImage('.popup_image'),
      avatarPopup = new PopupWithForm('.popup_avatar', (e) => {
        e.preventDefault()
        avatarPopupButton.textContent = 'Сохранение...'
        api.changeAvatar(avatarPopup.returnInputValues())
          .then(data => {
            avatar.src = data.avatar
        })
          .catch(err => {
            console.log(`Что-то пошло не так...
            Ошибка: ${err}`)
          })
          .finally(() => {
            avatarPopupButton.textContent = 'Сохранить'
            avatarPopup.close()
          })
      })
popupWithImage.setEventListeners()
avatarPopup.setEventListeners()

// Валидаторы

Array.from(document.querySelectorAll(validationSettings.formSelector)).forEach(form => {
  const formValidator = new FormValidator(validationSettings, form)
  formValidator.enableValidation()
  validators[form.id] = formValidator
})

// Кнопки

editButton.addEventListener('click', () => {
  profilePopup.open()
  const {name, about} = userInfoElement.getUserInfo()
  profilePopupNameInput.value = name
  profilePopupAboutInput.value = about
  validators['popupFormProfile'].toggleButtonState()
  validators['popupFormProfile'].clearValidationErrors()
})

addButton.addEventListener('click', () => {
  cardPopup.open()
  validators['popupFormCard'].clearValidationErrors()
})

avatarWrapper.addEventListener('click', () => {
  avatarPopup.open()
  validators['popupFormAvatar'].clearValidationErrors()
})

export { popupWithImage, api }


