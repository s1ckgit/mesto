export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened')
    window.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    window.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(e) {
    if(e.key && e.key === 'Escape') {
      this.close()
    }
  }

  _handleClose(e) {
    if(e.target.matches('.popup__close') || e.target.matches('.popup')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClose.bind(this))
  }
}
