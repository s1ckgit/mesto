export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = formElement
  }

  enableValidation() {
    this._setEventListeners(this._form, this._inputSelector, this._submitButtonSelector)
  }

  _setEventListeners(formElement, inputSelector, submitButtonSelector) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const buttonElement = formElement.querySelector(submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)
    formElement.addEventListener('reset', () => {
      this._disableButton(buttonElement)
    })
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement)
    } else {
      this._enableButton(buttonElement)
    }
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass)
    buttonElement.setAttribute('disabled', 'true')
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _checkInputValidity(formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideError(formElement, inputElement)
    }
  }

  _showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.input-error_${inputElement.id}`)
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.input-error_${inputElement.id}`)
    inputElement.classList.remove(this._inputErrorClass);
    setTimeout(() => errorElement.textContent = '', 300)
    errorElement.classList.remove(this._errorClass)
  }
}
