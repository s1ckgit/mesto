// Popup

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
  linkInput = document.querySelector('#link')

addButton.addEventListener('click', () => {
  cardPopup.classList.add('popup_opened')
})

editButton.addEventListener('click', () => {
  profilePopup.classList.add('popup_opened')

  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
})

profilePopup.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  profilePopup.classList.remove('popup_opened')
})

cardPopup.addEventListener('submit', (event) => {
  event.preventDefault()
  addNewCard(titleInput.value, linkInput.value)
  titleInput.value = ''
  linkInput.value = ''
  cardPopup.classList.remove('popup_opened')
})

closeButtons.forEach((item) => {
  item.addEventListener('click', (event) => {
    const target = event.target

    target.closest('.popup').classList.remove('popup_opened')
  })
})

// Cards

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderInitialCards() {
  const cardTemplate = document.getElementById('element-template').content,
    cardsContainer = document.querySelector('.elements')

  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true),
    cardImage = cardElement.querySelector('.element__img'),
    cardName = cardElement.querySelector('.element__name');

    cardImage.src = initialCards[i].link
    cardImage.alt = initialCards[i].name
    cardName.textContent = initialCards[i].name

    cardsContainer.append(cardElement)
  }
}

renderInitialCards()

function addNewCard(title, link) {
  const cardTemplate = document.getElementById('element-template').content,
    cardElement = cardTemplate.querySelector('.element').cloneNode(true),
    cardsContainer = document.querySelector('.elements'),
    cardImage = cardElement.querySelector('.element__img'),
    cardName = cardElement.querySelector('.element__name');

    cardImage.src = link
    cardImage.alt = title
    cardName.textContent = title

    cardsContainer.prepend(cardElement)
}

// Likes

document.addEventListener('click', (event) => {
  const target = event.target
  if (event.target.matches('.element__like')) {
    target.classList.toggle('element__like_active')
  }
})

// Delete

document.addEventListener('click', (event) => {
  const target = event.target
  if (event.target.matches('.element__delete')) {
    target.parentNode.remove()
  }
})

// Image Popup

document.addEventListener('click', (event) => {
  const target = event.target
  if (event.target.matches('.element__img')) {
    openImage(target.alt, target.src)
  }

})

function openImage(title, link) {
  const popupImage = document.querySelector('.popup__img'),
    popupTitle = document.querySelector('.popup__title_image')

  popupImage.src = link
  popupTitle.textContent = title

  imagePopup.classList.add('popup_opened')
}
