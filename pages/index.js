window.addEventListener('DOMContentLoaded', () => {

  // Popup

  let popup = document.querySelector('.popup'),
    editButton = document.querySelector('.profile__edit'),
    closeButton = document.querySelector('.popup__close'),
    popupInputs = popup.querySelectorAll('.popup__input'),
    profileName = document.querySelector('.profile__name'),
    profileAbout = document.querySelector('.profile__about'),
    popupForm = document.querySelector('.popup__form')

  editButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    popupInputs[0].value = profileName.textContent;
    popupInputs[1].value = profileAbout.textContent;
  })

  closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  })

  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = popupInputs[0].value;
    profileAbout.textContent = popupInputs[1].value;
    popup.classList.remove('popup_opened')
  })
})
