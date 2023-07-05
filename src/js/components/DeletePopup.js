import Popup from "./Popup";

export default class DeletePopup extends Popup {
  constructor({elementToDelete, id, popupSelector, submitCallback}) {
    super(popupSelector)
    this.elementToDelete = elementToDelete
    this._id = id
    this._submitCallback = submitCallback.bind(this)
    this._deleteButton = this._popup.querySelector('.popup__button')
    this._deleteButtonText = this._deleteButton.textContent
  }

  renderLoading(isError, isLoading, loadingText='Удаление...') {
    if(isLoading) {
      this._deleteButton.textContent = loadingText;
    } else if(isError === false && isLoading === false) {
      this._deleteButton.textContent = this._deleteButtonText;
    } else {
      this._deleteButton.textContent = 'Ошибка'
    }
  }

  open({elementToDelete, id}) {
    super.open()
    this.elementToDelete = elementToDelete
    this._id = id

    this._deleteButton.addEventListener('click', this._submitCallback)
  }

  close() {
    super.close()
    this._deleteButton.removeEventListener('click', this._submitCallback)
  }
}
