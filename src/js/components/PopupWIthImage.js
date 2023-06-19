import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('img')
    this._title = this._popup.querySelector('.popup__title')
  }

  open({link, name}) {
    this._image.src = link
    this._image.alt = name
    this._title.textContent = name
    super.open()
  }
}
