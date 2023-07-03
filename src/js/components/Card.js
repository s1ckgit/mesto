export default class Card {
  constructor({data, templateSelector, handleCardClick, removeApi, likeApi, currentUser, handleDelete}) {
    this._handleCardClick = handleCardClick
    this._title = data.name
    this._image = data.link
    this._id = data._id
    this._likes = data.likes
    this._removeApi = removeApi
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
    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._handleLikeButton(e)
    })

    try {
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleDeleteButton()
      })
    } catch(e) {}

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick()
    })
  }

  _handleLikeButton(e) {
    e.target.classList.toggle('element__like_active')
    if(!this._isLiked) {
      this._likeApi(this._id)
        .then(data => {
          this._likeCounterElement.textContent = data.likes.length
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
        })
    } else {
      this._likeApi(this._id, false)
        .then(data => {
          this._likeCounterElement.textContent = data.likes.length
        })
        .catch(err => {
          console.log(`Что-то пошло не так...
          Ошибка: ${err}`)
        })
    }

  }

  _handleDeleteButton() {
    this._handleDelete({elementToDelete: this._element, id: this._id, removeApi: this._removeApi})
  }

  generateCard() {
    this._element = this._getCardTemplate()
    this._likeCounterElement = this._element.querySelector('.element__likes-counter')

    if(this._currentUser._id != this._owner) {
      this._element.querySelector('.element__delete').remove()
    }
    if(this._isLiked) {
      this._element.querySelector('.element__like').classList.add('element__like_active')
    }

    this._element.querySelector('.element__img').src = this._image
    this._element.querySelector('.element__img').alt = this._title
    this._element.querySelector('.element__name').textContent = this._title
    this._likeCounterElement.textContent = this._likes.length

    this._setEventListeners()

    return this._element
  }
}
