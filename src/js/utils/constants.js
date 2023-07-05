const editButton = document.querySelector('.profile__edit'),
      addButton = document.querySelector('.profile__add'),
      profilePopup = document.querySelector('.popup_profile'),
      profilePopupButton = profilePopup.querySelector('.popup__button'),
      cardPopupButton = document.querySelector('.popup__button_card'),
      avatarPopupButton = document.querySelector('.popup__button_avatar'),
      profilePopupNameInput = profilePopup.querySelector('[name="name"]'),
      profilePopupAboutInput  = profilePopup.querySelector('[name="about"]'),
      avatarWrapper = document.querySelector('.profile__avatar-wrapper')

export { editButton, addButton, profilePopupNameInput, profilePopupAboutInput, avatarWrapper, profilePopupButton,
  cardPopupButton, avatarPopupButton }
