export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = formElement
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    this._buttonElement = formElement.querySelector(config.submitButtonSelector)
  }

  clearValidationErrors() {
    this._inputList.forEach(input => {
      this._clearInputError(input)
    })
  }

  _clearInputError(inputElement) {
    const errorElement = this._form.querySelector(`.input-error_${inputElement.id}`)
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = ''
    errorElement.classList.remove(this._errorClass)
  }

  enableValidation() {
    this._setEventListeners()
  }

  _setEventListeners() {
    this.toggleButtonState()
    this._form.addEventListener('reset', () => {
      this._disableButton()
    })
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this.toggleButtonState()
      })
    })
  }

  toggleButtonState() {
    if(this._hasInvalidInput(this._inputList)) {
      this._disableButton()
    } else {
      this._enableButton()
    }
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.removeAttribute('disabled')
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', 'true')
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage)
    } else {
      this._hideError(inputElement)
    }
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.input-error_${inputElement.id}`)
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.input-error_${inputElement.id}`)
    inputElement.classList.remove(this._inputErrorClass);
    setTimeout(() => errorElement.textContent = '', 300)
    errorElement.classList.remove(this._errorClass)
  }
}
