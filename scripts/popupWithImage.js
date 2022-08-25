import { Popup } from "./popup";

export class PopupWithImage extends Popup {
  constructor(popup_selector) {
    super(popup_selector);

  }
  openPopup ({name,link}) {

    console.log(this.popup);
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    popupCaption.textContent = name;
    popupPicture.alt = name;
    popupPicture.src = link;
    classPopupImage.openPopup();
  }
}
