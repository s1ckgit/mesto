import 'core-js'
import Api from '../js/components/Api.js'
import FormValidator from '../js/components/FormValidator.js'
import Section from '../js/components/Section.js'
import PopupWithImage from '../js/components/PopupWIthImage.js'
import PopupWithForm from '../js/components/PopupWithForm.js'
import { editButton, addButton, profilePopupNameInput, profilePopupAboutInput,
  profilePopupButton, avatarWrapper, cardPopupButton, avatarPopupButton
} from '../js/utils/constants.js'
import { validationSettings, validators } from '../js/utils/validationSettings.js'
import UserInfo from '../js/components/UserInfo.js'
import { createCardElement } from '../js/utils/utils.js'
import './index.css'
import DeletePopup from '../js/components/DeletePopup.js'

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
          profilePopupButton.textContent = 'Сохранить'
          profilePopup.close()
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
          profilePopupButton.textContent = `Ошибка: ${err.name}`
        })

    })
    cardPopup = new PopupWithForm('.popup_card', (e) => {
      e.preventDefault()
      cardPopupButton.textContent = 'Сохранение...'
      api.addCard(cardPopup.returnInputValues())
        .then(res => {
          cardsContainer.addItem(createCardElement(res, api, data[0]))
          cardPopupButton.textContent = 'Создать'
          cardPopup.close()
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
          cardPopupButton.textContent = `Ошибка: ${err.name}`
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
            userInfoElement.setUserInfo({name: data.name, about: data.about, avatar: data.avatar, id: data._id})
            avatarPopup.close()
            avatarPopupButton.textContent = 'Сохранить'
        })
          .catch(err => {
            console.log(`Что-то пошло не так...
            Ошибка: ${err}`)
            avatarPopupButton.textContent = `Ошибка: ${err.name}`
          })
      }),
      deletePopup = new DeletePopup({
        popupSelector: '.popup_delete',
        submitCallback: (e) => {
          e.preventDefault()
          deletePopup.deleteButton.textContent = 'Удаление...'
          api.deleteCard(deletePopup._id)
            .then(() => {
              deletePopup.deleteButton.textContent = 'Да'
              deletePopup._elementToDelete.remove()
              deletePopup.close()
            })
            .catch(err => {
              console.log(`Что-то пошло не так...
              Ошибка: ${err}`)
              deletePopup.deleteButton.textContent = `Ошибка: ${err.name}`
            })
        }
      })
popupWithImage.setEventListeners()
avatarPopup.setEventListeners()
deletePopup.setEventListeners()

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

export { popupWithImage, api, deletePopup }


