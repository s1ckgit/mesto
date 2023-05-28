import { popupImage, popupTitle, openPopup, imagePopup } from "./index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._title = data.name
    this._image = data.link
    this._templateSelector = templateSelector
  }

  _getCardTemplate() {
    const cardTemplate =  document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardTemplate
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._handleLikeButton(e)
    })

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteButton()
    })

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleOpenImage()
    })
  }

  _handleLikeButton(e) {
    e.target.classList.toggle('element__like_active')
  }

  _handleDeleteButton() {
    this._element.remove()
  }

  _handleOpenImage() {
    popupImage.src = this._image
    popupTitle.textContent = this._title
    popupImage.alt = this._title
    openPopup(imagePopup)
  }

  generateCard() {
    this._element = this._getCardTemplate()
    this._element.querySelector('.element__img').src = this._image
    this._element.querySelector('.element__img').alt = this._title
    this._element.querySelector('.element__name').textContent = this._title

    this._setEventListeners()

    return this._element
  }
}
