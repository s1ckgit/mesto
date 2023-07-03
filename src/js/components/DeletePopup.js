import Popup from "./Popup";

export default class DeletePopup extends Popup {
  constructor({elementToDelete, id, removeApi, popupSelector}) {
    super(popupSelector)
    this._elementToDelete = elementToDelete
    this._id = id
    this._removeApi = removeApi
    this._deleteButton = this._popup.querySelector('.popup__button')
  }

  setEventListeners() {
    super.setEventListeners()
    super.open()
    this._deleteButton.addEventListener('click', () => {
      this._removeApi(this._id)
      this._elementToDelete.remove()
      this._popup.classList.remove('popup_opened')
    })
  }
}
