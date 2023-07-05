import { popupWithImage } from "../../pages";
import Card from "../components/Card";
import { deletePopup } from "../../pages";

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
    handleDelete: ({elementToDelete, id}) => {
        deletePopup.open({elementToDelete: elementToDelete, id: id})
    }
    }).generateCard()
}
