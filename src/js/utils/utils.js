import { popupWithImage } from "../../pages";
import Card from "../components/Card";

export function createCardElement(data) {
  return new Card(data, '#element-template', () => {
    popupWithImage.open({link: data.link, name: data.name})
  }).generateCard()
}
