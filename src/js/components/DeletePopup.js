import Popup from "./Popup";

export default class DeletePopup extends Popup {
  constructor({elementToDelete, id, popupSelector, submitCallback}) {
    super(popupSelector)
    this._elementToDelete = elementToDelete
    this._id = id
    this._submitCallback = submitCallback.bind(this)
    this.deleteButton = this._popup.querySelector('.popup__button')
  }

  open({elementToDelete, id}) {
    super.open()
    this._elementToDelete = elementToDelete
    this._id = id

    this.deleteButton.addEventListener('click', this._submitCallback)
  }

  close() {
    super.close()
    this.deleteButton.removeEventListener('click', this._submitCallback)
  }
}
