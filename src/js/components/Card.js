export default class Card {
  constructor({data, templateSelector, handleCardClick, likeApi, currentUser, handleDelete}) {
    this._handleCardClick = handleCardClick
    this._title = data.name
    this._image = data.link
    this._id = data._id
    this._likes = data.likes
    this._likeApi = likeApi
    this._handleDelete = handleDelete
    this._owner = data.owner._id
    this._currentUser = currentUser
    this._templateSelector = templateSelector
    this._isLiked = this._likes.find(user => {return user._id === this._currentUser._id})
  }

  _getCardTemplate() {
    const cardTemplate =  document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardTemplate
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton()
    })

    try {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButton()
      })
    } catch(e) {}

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick()
    })
  }

  _handleLikeButton() {
    if(!this._isLiked) {
      this._likeApi(this._id)
        .then(data => {
          this._likeCounterElement.textContent = data.likes.length
          this._isLiked = true
          this._likeButton.classList.toggle('element__like_active')
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
        })
    } else {
      this._likeApi(this._id, false)
        .then(data => {
          this._isLiked = false
          this._likeCounterElement.textContent = data.likes.length
          this._likeButton.classList.toggle('element__like_active')
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
        })
    }

  }

  _handleDeleteButton() {
    this._handleDelete({elementToDelete: this._element, id: this._id})
  }

  generateCard() {
    this._element = this._getCardTemplate()
    this._likeButton = this._element.querySelector('.element__like')
    this._deleteButton = this._element.querySelector('.element__delete')
    this._imageElement = this._element.querySelector('.element__img')
    this._cardName = this._element.querySelector('.element__name')
    this._likeCounterElement = this._element.querySelector('.element__likes-counter')

    if(this._currentUser._id != this._owner) {
      this._deleteButton.remove()
    }
    if(this._isLiked) {
      this._likeButton.classList.add('element__like_active')
    }

    this._imageElement.src = this._image
    this._imageElement.alt = this._title
    this._cardName.textContent = this._title
    this._likeCounterElement.textContent = this._likes.length

    this._setEventListeners()

    return this._element
  }
}
