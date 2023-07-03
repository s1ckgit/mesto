import { popupWithImage } from "../../pages";
import Card from "../components/Card";
import DeletePopup from "../components/DeletePopup";

export function createCardElement(data, api, user) {
  return new Card({
    data: data,
    templateSelector: '#element-template',
    handleCardClick: () => {
      popupWithImage.open({link: data.link, name: data.name})
    },
    removeApi: api.deleteCard,
    likeApi: api.likeCard,
    currentUser: user,
    handleDelete: ({elementToDelete, id, removeApi}) => {
      new DeletePopup({elementToDelete: elementToDelete, id: id, removeApi: removeApi, popupSelector: '.popup_delete'})
          .setEventListeners()
    }
    }).generateCard()
}
