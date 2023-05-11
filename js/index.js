const editButton = document.querySelector('.profile__edit'),
  addButton = document.querySelector('.profile__add'),
  likeButton = document.querySelector('.element__like'),
  profilePopup = document.querySelector('.popup_profile'),
  cardPopup = document.querySelector('.popup_card'),
  imagePopup = document.querySelector('.popup_image'),
  profileName = document.querySelector('.profile__name'),
  profileAbout = document.querySelector('.profile__about'),
  nameInput = document.querySelector('#name'),
  aboutInput = document.querySelector('#about'),
  titleInput = document.querySelector('#title'),
  linkInput = document.querySelector('#link'),
  popupImage = document.querySelector('.popup__img'),
  popupTitle = document.querySelector('.popup__title_image'),
  cardsContainer = document.querySelector('.elements'),
  profileSubmitButton = document.querySelector('.popup__button_profile')

// nameInput.value = profileName.textContent
// aboutInput.value = profileAbout.textContent

// Если убрать две строчки выше, то кнопка 'Сохранить' в редактировании профиля будет неактивной при первом открытии,
// т.к при загрузке страницы инпуты будут пустые и функция toggleButtonState деактивирует эту кнопку.
// Поэтому, я вызвал toggleButtonState при клике на кнопку открытия редактирования профиля
// P.S Благодарю за отличное ревью

addButton.addEventListener('click', () => {
  openPopup(cardPopup)
})

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  toggleButtonState([nameInput, aboutInput], profileSubmitButton)
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

function createCard(title, link) {
  const cardTemplate = document.getElementById('element-template').content,
    cardElement = cardTemplate.querySelector('.element').cloneNode(true),
    cardImage = cardElement.querySelector('.element__img'),
    cardName = cardElement.querySelector('.element__name'),
    likeButton = cardElement.querySelector('.element__like'),
    deleteButton = cardElement.querySelector('.element__delete')

    cardImage.src = link
    cardImage.alt = title
    cardName.textContent = title

    cardImage.addEventListener('click', () => {
      openImage(cardName.textContent, cardImage.src)
    })

    likeButton.addEventListener('click', (event) => {
      const target = event.target
      target.classList.toggle('element__like_active')
    })

    deleteButton.addEventListener('click', (event) => {
      cardElement.remove()
    })

    return cardElement
}

function openImage(title, link) {
  popupImage.src = link
  popupTitle.textContent = title
  popupImage.alt = title
  openPopup(imagePopup)
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
  cardsContainer.prepend(createCard(titleInput.value, linkInput.value))
  event.target.reset()
  closePopup(cardPopup)
}
