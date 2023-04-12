 // Popup

let popup = document.querySelector('.popup'),
  editButton = document.querySelector('.profile__edit'),
  closeButton = document.querySelector('.popup__close'),
  nameInput = popup.querySelector('#name'),
  aboutInput = popup.querySelector('#about'),
  profileName = document.querySelector('.profile__name'),
  profileAbout = document.querySelector('.profile__about'),
  popupForm = document.querySelector('.popup__form')

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popup.classList.remove('popup_opened')
})
