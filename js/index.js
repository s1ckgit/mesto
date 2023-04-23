// Popup

const editButton = document.querySelector('.profile__edit'),
  addButton = document.querySelector('.profile__add'),
  profileName = document.querySelector('.profile__name'),
  profileAbout = document.querySelector('.profile__about'),
  popupTemplate = document.getElementById('popup-template').content;

addButton.addEventListener('click', () => {
  renderPopup('card')
})

editButton.addEventListener('click', () => {
  renderPopup('profile')
})

function renderPopup(type) {
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true),
    popupElementTitle = popupElement.querySelector('.popup__title'),
    popupElementInputs = popupElement.querySelectorAll('.popup__input'),
    popupElementButton = popupElement.querySelector('.popup__button')

    switch (type) {
      case 'profile':
        popupElement.dataset.action = 'profileEdit'
        popupElementTitle.textContent = 'Редактировать профиль'
        popupElementInputs[0].setAttribute('name', 'name')
        popupElementInputs[0].setAttribute('id', 'name')
        popupElementInputs[0].setAttribute('placeholder', 'Имя')
        popupElementInputs[1].setAttribute('name', 'about')
        popupElementInputs[1].setAttribute('id', 'about')
        popupElementInputs[1].setAttribute('placeholder', 'О себе')
        popupElementButton.textContent = 'Сохранить'

        const nameInput = popupElement.querySelector('#name'),
          aboutInput = popupElement.querySelector('#about')

        nameInput.value = profileName.textContent
        aboutInput.value = profileAbout.textContent
        break

      case 'card':
        popupElement.dataset.action = 'cardAdd'
        popupElementTitle.textContent = 'Новое место'
        popupElementInputs[0].setAttribute('name', 'title')
        popupElementInputs[0].setAttribute('id', 'title')
        popupElementInputs[0].setAttribute('placeholder', 'Название')
        popupElementInputs[1].setAttribute('name', 'link')
        popupElementInputs[1].setAttribute('id', 'link')
        popupElementInputs[1].setAttribute('placeholder', 'Ссылка на картинку')
        popupElementButton.textContent = 'Создать'
        break
    }

    document.querySelector('.footer').after(popupElement)

    addFormListeners()

    setTimeout(() => {popupElement.classList.add('popup_opened')})

}

function addFormListeners() {
  const popup = document.querySelector('.popup'),
    closeButton = document.querySelector('.popup__close'),
    popupForm = document.querySelector('.popup__form');

  closeButton.addEventListener('click', () => {
      closePopup()
  })

  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    switch (popup.dataset.action) {
      case 'profileEdit':
        const nameInput = popup.querySelector('#name'),
          aboutInput = popup.querySelector('#about')

        profileName.textContent = nameInput.value;
        profileAbout.textContent = aboutInput.value;
        break

      case 'cardAdd':
        const popupInputTitle = document.querySelector('.popup__input[name="title"]'),
          popupInputLink = document.querySelector('.popup__input[name="link"]')

        addNewCard(popupInputTitle.value, popupInputLink.value)
        break
    }
    closePopup()
  })
}

function closePopup(type = '') {
  const popup = document.querySelector(`.${type}popup`)
  popup.classList.remove(`${type}popup_opened`)
  setTimeout(() => {
    popup.remove()
  }, 300)
}

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

const likeButton = document.querySelector('.element__like')

document.addEventListener('click', (event) => {
  let target = event.target
  if (event.target.matches('.element__like')) {
    target.classList.toggle('element__like_active')
  }
})

// Delete

document.addEventListener('click', (event) => {
  let target = event.target
  if (event.target.matches('.element__delete')) {
    target.parentNode.remove()
  }
})

// Image-popup

function renderImagePopup(image) {
  const imagePopupTemplate = document.getElementById('image-popup-template').content,
    imagePopupElement = imagePopupTemplate.querySelector('.image-popup').cloneNode(true),
    imagePopupImage = imagePopupElement.querySelector('.image-popup__img'),
    imagePopupTitle = imagePopupElement.querySelector('.image-popup__title')

  imagePopupImage.src = image.src
  imagePopupImage.alt = image.alt
  imagePopupTitle.textContent = image.alt

  document.querySelector('.footer').after(imagePopupElement)

  setTimeout(() => {imagePopupElement.classList.add('image-popup_opened')})
}

document.addEventListener('click', (event) => {
  let target = event.target
  if (target.matches('.element__img')) {
    renderImagePopup(target)
    const closeButton = document.querySelector('.popup__close')
    closeButton.addEventListener('click', () => {
      closePopup('image-')
    })
  }
})
