import 'core-js'
import Api from '../js/components/Api.js'
import FormValidator from '../js/components/FormValidator.js'
import Section from '../js/components/Section.js'
import PopupWithImage from '../js/components/PopupWIthImage.js'
import PopupWithForm from '../js/components/PopupWithForm.js'
import { editButton, addButton, avatarWrapper } from '../js/utils/constants.js'
import { validationSettings, validators } from '../js/utils/validationSettings.js'
import UserInfo from '../js/components/UserInfo.js'
import Card from '../js/components/Card.js'
import './index.css'
import DeletePopup from '../js/components/DeletePopup.js'

// Благодарю за отличное ревью. Хорошего дня :)

// Декларация функции создания карточки

function createCardElement(data, api, user) {
  return new Card({
    data: data,
    templateSelector: '#element-template',
    handleCardClick: () => {
      popupWithImage.open({link: data.link, name: data.name})
    },
    removeApi: api.deleteCard,
    likeApi: api.likeCard,
    currentUser: user,
    handleDelete: ({elementToDelete, id}) => {
        deletePopup.open({elementToDelete: elementToDelete, id: id})
    }
    }).generateCard()
}

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
  .then(([userData, cards]) => {
    // Рендер карточек
    const cardsContainer = new Section({
      items: cards.reverse(),
      renderer: (item) => {
        return createCardElement(item, api, userData)
      }
    }, '.elements')
    cardsContainer.renderAll()

    // Загрузка данных пользователя
    userInfoElement.setUserInfo(userData)

    // Создание попапов
    profilePopup = new PopupWithForm('.popup_profile', (e) => {
      e.preventDefault()
      profilePopup.renderLoading(false, true)
      api.changeUserInfo(profilePopup.returnInputValues())
        .then(res => {
          userInfoElement.setUserInfo(res)
          profilePopup.renderLoading(false, false)
          profilePopup.close()
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
          profilePopup.renderLoading(true, false)
        })

    })
    cardPopup = new PopupWithForm('.popup_card', (e) => {
      e.preventDefault()
      cardPopup.renderLoading(false, true)
      api.addCard(cardPopup.returnInputValues())
        .then(res => {
          cardsContainer.addItem(createCardElement(res, api, userData))
          cardPopup.renderLoading(false, false)
          cardPopup.close()
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
          cardPopup.renderLoading(true, false)
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
        avatarPopup.renderLoading(false, true)
        api.changeAvatar(avatarPopup.returnInputValues())
          .then(data => {
            userInfoElement.setUserInfo({name: data.name, about: data.about, avatar: data.avatar, id: data._id})
            avatarPopup.close()
            avatarPopup.renderLoading(false, false)
        })
          .catch(err => {
            console.log(`Что-то пошло не так...
            Ошибка: ${err}`)
            avatarPopup.renderLoading(true, false)
          })
      }),
      deletePopup = new DeletePopup({
        popupSelector: '.popup_delete',
        submitCallback: (e) => {
          e.preventDefault()
          deletePopup.renderLoading(false, true)
          api.deleteCard(deletePopup._id)
            .then(() => {
              deletePopup.renderLoading(false, false)
              deletePopup.elementToDelete.remove()
              deletePopup.close()
            })
            .catch(err => {
              console.log(`Что-то пошло не так...
              Ошибка: ${err}`)
              deletePopup.renderLoading(true, false)
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
  profilePopup.setInputValues(userInfoElement.getUserInfo())
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


