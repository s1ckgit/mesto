const editButton = document.querySelector('.profile__edit'),
  addButton = document.querySelector('.profile__add'),
  closeButtons = document.querySelectorAll('.popup__close'),
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
  cardsContainer = document.querySelector('.elements')

addButton.addEventListener('click', () => {
  openPopup(cardPopup)
})

editButton.addEventListener('click', () => {
  openPopup(profilePopup)

  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
})

profilePopup.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  closePopup(profilePopup)
})

cardPopup.addEventListener('submit', (event) => {
  event.preventDefault()
  cardsContainer.prepend(createCard(titleInput.value, linkInput.value))
  titleInput.value = ''
  linkInput.value = ''
  closePopup(cardPopup)
})

closeButtons.forEach((item) => {
  item.addEventListener('click', (event) => {
    const target = event.target
    const currentPopup = target.closest('.popup')
    closePopup(currentPopup)
  })
})

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
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
      const target = event.target
      target.parentNode.remove()
    })

    return cardElement
}

function openImage(title, link) {
  popupImage.src = link
  popupTitle.textContent = title

  openPopup(imagePopup)
}
