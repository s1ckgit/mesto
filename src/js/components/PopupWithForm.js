import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('input')
    this._submitBtn = this._popup.querySelector('.popup__button')
    this._submitBtnText = this._submitBtn.textContent
    this.inputsValue = {}
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this.inputsValue[input.name] = input.value
    })
  }

  renderLoading(isError, isLoading, loadingText='Сохранение...') {
    if(isLoading) {
      this._submitBtn.textContent = loadingText;
    } else if(isError === false && isLoading === false) {
      this._submitBtn.textContent = this._submitBtnText;
    } else {
      this._submitBtn.textContent = 'Ошибка'
    }
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name]
    })
  }

  returnInputValues() {
    this._getInputValues()
    return this.inputsValue
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitCallback)
  }

  close() {
    super.close()
    this._form.reset()
  }
}
