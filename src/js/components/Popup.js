export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened')
  }

  close() {
    this._popup.classList.remove('popup_opened')
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
    window.addEventListener('keydown', this._handleEscClose.bind(this))
  }
}
