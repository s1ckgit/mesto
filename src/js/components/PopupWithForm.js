import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback
    this.inputsValue = {}
  }

  _getInputValues() {
    this._popup.querySelector('form').querySelectorAll('input').forEach(input => {
      this.inputsValue[input.name] = input.value
    })
  }

  returnInputValues() {
    this._getInputValues()
    return this.inputsValue
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.querySelector('form').addEventListener('submit', this._submitCallback)
  }

  close() {
    super.close()
    this._popup.querySelector('form').reset()
  }
}
